"use strict";
(function() {

var $ = self.Bliss = function(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
};

// Copy properties from one object to another. Overwrites allowed.
$.extend = function (to, from, callback) {
	for (var property in from) {
		// To copy gettters/setters, preserve flags etc
		var descriptor = Object.getOwnPropertyDescriptor(from, property);

		if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
			delete to[property];
			Object.defineProperty(to, property, descriptor);
		}
		else {
			to[property] = from[property];
		}

		callback && callback.call(to, property);
	}
	
	return to;
}

$.extend($, {
	$: function(expr, con) {
		return expr instanceof Node || expr instanceof Window? [expr] :
		       [].slice.call(typeof expr == "string"? (con || document).querySelectorAll(expr) : expr || []);
	},
	
	/**
	 * Returns the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc)
	 */
	type: function(obj) {
		if (obj === null) { return 'null'; }
	
		if (obj === undefined) { return 'undefined'; }
	
		var ret = (Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
	
		if(ret == 'number' && isNaN(obj)) {
			return 'NaN';
		}
	
		return ret;
	},
	
	/*
	 * Return first non-undefined value. Mainly used internally.
	 */
	firstDefined: function () {
		for (var i=0; i<arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
	},
	
	create: function (o) {
		var doc = o.document || document;
		
		if ($.type(o) === "string") {
			if (arguments.length === 1) {
				return doc.createTextNode(o);
			}
			else {
				o = arguments[1];
				o.tag = arguments[0];
			}
		}
		
		var element = doc.createElement(o.tag);
		delete o.tag;
		
		return element._.set(o);
	},

	// Clones any object, including DOM elements
	clone: function (o) {
		if (o === null || o === undefined) {
			return o;
		}

		var type = $.type(o);
		var clone;

		// Clone elements, with events
		// TODO instanceof Node doesn’t account for nodes from other documents
		if (o.cloneNode && o instanceof Node) {
			clone = o.cloneNode(true);

			var copyEvents = function(from, to) {

				var listeners = from._.bliss.listeners;
				
				for (var type in listeners) {
					listeners[type].forEach(function(l){
						to.addEventListener(type, l.callback, l.capture);
					});
				}
			};

			var cloneDescendants = $.$("*", clone);

			$.$("*", o).forEach(function(element, i, arr) {
				copyEvents(element, cloneDescendants[i]);
			});

			copyEvents(o, clone);
		}

		// TODO clone other types of objects

		return clone;
	},

	// Lazily evaluated properties
	lazy: function(obj, property, getter) {
		if (arguments.length === 3) {
			Object.defineProperty(obj, property, {
				get: function() {
					// FIXME this does not work for instances if property is defined on the prototype
					delete this[property];

					try { this[property] = 5;
					} catch(e) {console.error(e)}

					return this[property] = getter.call(this);
				},
				configurable: true,
				enumerable: true
			});
		}
		else {
			for (var prop in property) {
				$.lazy(obj, prop, property[prop]);
			}
		}
	},

	// Properties that behave like normal properties but also execute code upon getting/setting
	stored: function(obj, property, descriptor) {
		if (arguments.length === 3) {
			Object.defineProperty(obj, property, {
				get: function() {
					var value = this["_" + property];
					var ret = descriptor.get && descriptor.get.call(this, value);
					return ret !== undefined? ret : value;
				},
				set: function(v) {
					var value = this["_" + property];
					var ret = descriptor.set && descriptor.set.call(this, v, value);
					this["_" + property] = ret !== undefined? ret : v;
				},
				configurable: descriptor.configurable,
				enumerable: descriptor.enumerable
			});
		}
		else {
			for (var prop in property) {
				$.stored(obj, prop, property[prop]);
			}
		}
	},

	// Helper for defining OOP-like “classes”
	Class: function(o) {
		var init = o.constructor || function(){};
		delete o.constructor;

		var abstract = o.abstract;
		delete o.abstract;

		var ret = function() {
			if (abstract && this.constructor === ret) {
				throw new Error("Abstract classes cannot be directly instantiated.");
			}

			if (this.constructor.super && this.constructor.super != ret) {
				// FIXME This should never happen, but for some reason it does if ret.super is null
				// Debugging revealed that somehow this.constructor !== ret, wtf. Must look more into this
				this.constructor.super.apply(this, arguments);
			}

			return init.apply(this, arguments);
		};

		ret.super = o.extends || null;
		delete o.extends;

		ret.prototype = $.extend(Object.create(ret.super && ret.super.prototype), {
			constructor: ret
		});

		$.extend(ret, o.static);
		delete o.static;

		$.lazy(ret.prototype, o.lazy);
		delete o.lazy;

		$.stored(ret.prototype, o.stored);
		delete o.stored;

		// Anything that remains is an instance method/property or ret.prototype.constructor
		$.extend(ret.prototype, o);

		// For easier calling of super methods
		// This doesn't save us from having to use .call(this) though
		ret.prototype.super = ret.super? ret.super.prototype : null;
		
		return ret;
	},

	// Includes a script, returns a promise
	include: function() {
		var url = arguments[arguments.length - 1];
		var loaded = arguments.length === 2? arguments[0] : false;

		var script = document.createElement("script");

		return loaded? Promise.resolve() : new Promise(function(resolve, reject){
			$.set(script, {
				async: true,
				onload: function() {
					resolve();
					$.remove(script);
				},
				onerror: function() {
					reject();
				},
				src: url,
				inside: document.head
			});
		});
		
	},

	/*
	 * Fetch API inspired XHR helper. Returns promise.
	 */
	fetch: function(url, o) {
		if (!url) {
			throw new TypeError("URL parameter is mandatory and cannot be " + url);
		}

		// Set defaults & fixup arguments
		url = new URL(url, location);
		o = o || {};
		o.data = o.data || '';
		o.method = o.method || 'GET';
		o.headers = o.headers || {};
		o.onerror = o.onerror || $.fetch.onerror || null;

		var xhr = new XMLHttpRequest();

		if (o.method === "GET" && o.data) {
			url.search += o.data;
		}
		
		document.body.setAttribute('data-loading', url);
		
		xhr.open(o.method, url, !o.sync);

		for (var property in o) {

			if (property in xhr) {
				try {
					xhr[property] = o[property];
				}
				catch (e) {
					self.console && console.error(e);
				}
			}
		}
		
		if (o.method !== 'GET' && !o.headers['Content-type'] && !o.headers['Content-Type']) {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}
		
		for (var header in o.headers) {
			xhr.setRequestHeader(header, o.headers[header]);
		}
		
		return new Promise(function(resolve, reject){
			xhr.onload = function(){
				document.body.removeAttribute('data-loading');
					
				if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
					// Success!
					resolve(xhr);
				}
				else if (o.onerror) {
					reject(Error(xhr.statusText));
				}
			
			};
			
			xhr.onerror = function() {
				reject(Error("Network Error"));
			};

			xhr.send(o.method === 'GET'? null : o.data);
		});
	}
});

$.Element = function (element) {
	this.element = element;

	// Author-defined element-related data
	this.data = {};

	// Internal Bliss element-related data
	this.bliss = {};
};

$.Element.prototype = {
	set: function (properties) {
		if (arguments.length == 2) {
			properties = {};
			properties[arguments[0]] = arguments[1];
		}
		
		for (var property in properties) {
			if (property in $.setSpecial) {
				$.setSpecial[property].call(this, properties[property]);
			}
			else if (property in this) {
				this[property] = properties[property];
			}
			else {
				this.setAttribute(property, properties[property]);
			}
		}
		
		return this;
	},
	
	// Remove element from the DOM, optionally with a fade
	remove: function(animation, duration) {
		return new Promise(function(resolve, reject){
			if (animation && "transition" in this.style) {
				$.style(this, {
					transition: (duration || 400) + "ms",
					transitionProperty: Object.keys(animation).join(", ")
				});
				
				var me = this;

				this.addEventListener("transitionend", function(){
					$.remove(me);
					resolve();
				});

				$.style(this, animation);
			}
			else {
				this.parentNode && this.parentNode.removeChild(this);
				resolve();
			}
		}.bind(this));
	},
	
	// Fire a synthesized event on the element
	fire: function (type, properties) {
		var evt = document.createEvent("HTMLEvents");
				
		evt.initEvent(type, true, true );

		this.dispatchEvent($.extend(evt, properties));
	},

	// Returns a promise that gets resolved after {type} has fired at least once
	waitFor: function(type) {
		if (this._.bliss.fired && this._.bliss.fired[type] > 0) {
			// Already fired
			return Promise.resolve();
		}
		
		var me = this;

		return new Promise(function(resolve, reject){
			me.addEventListener(type, function callback(evt) {
				resolve(evt);
				me.removeEventListener(type, callback);
			});
		});
	}
};

/*
 * Properties with custom handling in element._.set()
 * Also available as functions directly on element._ and on $
 */
$.setSpecial = {
	// Set a bunch of inline CSS styles
	style: function (val) {
		$.extend(this.style, val);
	},
	
	// Set a bunch of attributes
	attributes: function (val) {
		for (var attribute in val) {
			this.setAttribute(attribute, o[attribute]);
		}
	},
	
	// Set a bunch of properties on the element
	properties: function (val) {
		$.extend(this, val);
	},
	
	// Bind one or more events to the element
	events: function (val) {
		for (var events in val) {
			events.split(/\s+/).forEach(function (event) {
				this.addEventListener(event, val[events]);
			}, this);
		}
	},

	// Event delegation
	delegate: function(val) {
		if (arguments.length === 3) {
			// Called with ("type", "selector", callback)
			val = {};
			val[arguments[0]] = {};
			val[arguments[0]][arguments[1]] = arguments[2];
		}
		else if (arguments.length === 2) {
			// Called with ("type", selectors & callbacks)
			val = {};
			val[arguments[0]] = arguments[1];
		}

		var element = this;

		for (var type in val) {
			(function (type, callbacks) {
				element.addEventListener(type, function(evt) {
					for (var selector in callbacks) {
						if (evt.target.matches(selector)) { // Do ancestors count?
							callbacks[selector].call(this, evt);
						}
					}	
				});
			})(type, val[type]);
		}
	},
	
	// Set the contents as a string, an element, an object to create an element or an array of these
	contents: function (val) {
		if(!val && val !== 0) {
			return;
		}
		
		(Array.isArray(val)? val : [val]).forEach(function (child) {
			if (["string", "number", "object"].indexOf($.type(child)) > -1) {
				child = $.create(child);
			}
			
			if (child instanceof Node) {
				(/^template$/i.test(this.nodeName)? this.content || this : this).appendChild(child);
			}
		}, this);
	},
	
	// Append the element inside another element
	inside: function (element) {
		element.appendChild(this);
	},
	
	// Insert the element before another element
	before: function (element) {
		element.parentNode.insertBefore(this, element);
	},
	
	// Insert the element after another element
	after: function (element) {
		element.parentNode.insertBefore(this, element.nextSibling);
	},
	
	// Insert the element before another element in the DOM
	start: function (element) {
		element.insertBefore(this, element.firstChild);
	},
	
	// Wrap the element around another element
	around: function (element) {
		if (element.parentNode) {
			$.setSpecial.before.call(this, element);
		}
		
		(/^template$/i.test(this.nodeName)? this.content || this : this).appendChild(element);
	}
};

$.Array = function (array) {
	this.array = array;
};

// Extends Bliss with more methods

$.add = function (methods, on) {
	on = $.extend({$: true, element: true, array: true}, on);
	
	if ($.type(arguments[0]) === "string") {
		methods = {};
		methods[arguments[0]] = arguments[1];
	}
	
	for (var method in methods) {
		try {
			var callback = methods[method];
		}
		catch (e) {
			continue;
		}
		
		(function(method, callback){
		
		if ($.type(callback) == "function") {
			if (on.$) {
				$[method] = function () {
					var args = [].slice.apply(arguments);
					var element = args.shift();
					
					return element && $.firstDefined(callback.apply(element, args), element);
				}
			}
			
			if (on.element) {
				$.Element.prototype[method] = function () {
					return $.firstDefined(callback.apply(this.element, arguments), this.element);
				}
			}
			
			if (on.array) {
				$.Array.prototype[method] = function() {
					var args = arguments;
					
					return this.array.map(function(element) {
						return $.firstDefined(callback.apply(element, args), element);
					});
				}
			}
		}
		
		})(method, callback);
	}
};

$.add($.Element.prototype);
$.add($.setSpecial);
$.add(HTMLElement.prototype, {$: false, element: false});

// Define the _ property on arrays and elements

Object.defineProperty(Node.prototype, "_", {
	get: function () {
		Object.defineProperty(this, "_", {
			value: new $.Element(this)
		});
		
		return this._;
	},
	configurable: true
});

Object.defineProperty(Array.prototype, "_", {
	get: function () {
		Object.defineProperty(this, "_", {
			value: new $.Array(this)
		});
		
		return this._;
	},
	configurable: true
});

// Hijack addEventListener and removeEventListener to store callbacks

if (self.EventTarget && "addEventListener" in EventTarget.prototype) {
	var addEventListener = EventTarget.prototype.addEventListener,
	    removeEventListener = EventTarget.prototype.removeEventListener,
	    filter = function(callback, capture, l){
	    	return !(l.callback === callback && l.capture == capture);
	    };

	EventTarget.prototype.addEventListener = function(type, callback, capture) {
		if (this._) {
			var listeners = this._.bliss.listeners = this._.bliss.listeners || {};
			
			listeners[type] = listeners[type] || [];

			var fired = this._.bliss.fired = this._.bliss.fired || {};
			fired[type] = fired[type] || 0;
			
			var oldCallback = callback;
			callback = function() {
				this._.bliss.fired[type]++;

				return oldCallback.apply(this, arguments)
			};
			oldCallback.callback = callback;
			
			if (listeners[type].filter(filter.bind(null, callback, capture)).length === 0) {
				listeners[type].push({callback: oldCallback, capture: capture});
			}
		}

		return addEventListener.call(this, type, callback, capture);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, capture) {
		if (this._) {
			var listeners = this._.bliss.listeners = this._.bliss.listeners || {};

			var oldCallback = callback;
			callback = oldCallback.callback;

			listeners[type] = listeners[type] || [];
			listeners[type] = listeners[type].filter(filter.bind(null, callback, capture));
		}

		return removeEventListener.call(this, type, callback, capture);
	};
}

})();