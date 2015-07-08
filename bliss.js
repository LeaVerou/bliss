"use strict";
(function() {

var $ = self.Bliss = function(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
};

// Copy properties from one object to another. Overwrites allowed.
$.extend = function (to, from) {
	for (var property in from) {
		// To copy gettters/setters, preserve flags etc
		var descriptor = Object.getOwnPropertyDescriptor(from, property);

		if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
			Object.defineProperty(to, property, descriptor);
		}
		else {
			to[property] = from[property];
		}
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
			return doc.createTextNode(o);
		}
		
		var element = doc.createElement(o.tag);
		
		return element._.set(o);
	},

	// Clones any object, including DOM elements
	clone: function (o) {
		if (o === null || o === undefined) {
			return o;
		}

		var type = $.type(o);
		var clone;

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

	xhr: function(o) {		
		var xhr = new XMLHttpRequest(),
			method = o.method || 'GET',
			data = o.data || '',
			url = new URL(o.url);

		if (o.method === "GET" && data) {
			url.search += data;
		}
		
		document.body.setAttribute('data-loading', url);

		o.headers = o.headers || {};

		o.onerror = o.onerror || $.xhr.onerror || null;
		
		xhr.open(method, url, !o.sync);
		
		if (method !== 'GET' && !o.headers['Content-type'] && !o.headers['Content-Type']) {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}
		
		for (var header in o.headers) {
			xhr.setRequestHeader(header, o.headers[header]);
		}
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) {
				document.body.removeAttribute('data-loading');
				
				if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
					// Success
					o.callback.call(xhr, xhr);
				}
				else if (o.onerror) {
					o.onerror.call(xhr, xhr);
				}
			}
		};
		
		xhr.send(method === 'GET'? null : data);
		
		return xhr;
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
		if (animation && "transition" in this.style) {
			$.style(this, {
				transition: (duration || 400) + "ms",
				transitionProperty: Object.keys(animation).join(", ")
			});
			
			var me = this;
			this.addEventListener("transitionend", function(){
				$.remove(me);
			});

			$.style(this, animation);
		}
		else {
			this.parentNode && this.parentNode.removeChild(this);
		}
	},
	
	// Fire a synthesized event on the element
	fireEvent: function (type, properties) {
		var evt = document.createEvent("HTMLEvents");
				
		evt.initEvent(type, true, true );

		this.dispatchEvent($.extend(evt, properties));
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

Object.defineProperty(Element.prototype, "_", {
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
			
			if (listeners[type].filter(filter.bind(null, callback, capture)).length === 0) {
				listeners[type].push({callback: callback, capture: capture});
			}
		}

		return addEventListener.apply(this, arguments);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, capture) {
		if (this._) {
			var listeners = this._.bliss.listeners = this._.bliss.listeners || {};

			listeners[type] = listeners[type] || [];
			listeners[type] = listeners[type].filter(filter.bind(null, callback, capture));
		}

		return removeEventListener.apply(this, arguments);
	};
}


// Export to global scope
self.$ = $;
self.$$ = $.$;

})();