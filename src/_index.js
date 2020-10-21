import $ from "./$.js";
import $$ from "./$$.js";

import overload from "./overload.js";
import extend from "./extend.js";
import type from "./type.js";

import create from "./create.js";
import set from "./dom/set.js";
import each from "./each.js";
import ready from "./ready.js";
import Class from "./Class.js";
import value from "./value.js";
import Hooks from "./Hooks.js";
import fetch from "./fetch.js";
import add from "./add.js";

(function() {
"use strict";

let Bliss = extend($, self.Bliss);

extend($, {
	extend,
	overload,
	type,

	property: $.property || "_",

	$: $$,

	create,
	each,
	ready,

	Class,
	live,
	lazy,

	include,
	load,

	fetch,

	value,

	Hooks,
	hooks: new Hooks()
});

var _ = $.property;

$.Element = function (subject) {
	this.subject = subject;

	// Author-defined element-related data
	this.data = {};

	// Internal Bliss element-related data
	this.bliss = {};
};

$.Element.prototype = {
	set,


	transition,

	fire,



	// Return a promise that resolves when an event fires, then unbind
	when: function(type, test) {
		var me = this;
		return new Promise(function(resolve) {
			me.addEventListener(type, function callee(evt) {
				if (!test || test.call(this, evt)) {
					this.removeEventListener(type, callee);
					resolve(evt);
				}
			});
		});
	},

	toggleAttribute: function(name, value, test) {
		if (arguments.length < 3) {
			test = value !== null;
		}

		if (test) {
			this.setAttribute(name, value);
		}
		else {
			this.removeAttribute(name);
		}
	}
};

/*
 * Properties with custom handling in $.set()
 * Also available as functions directly on element._ and on $
 */
$.setProps = {
	// Set a bunch of inline CSS styles
	style: function (val) {
		for (var property in val) {
			if (property in this.style) {
				// camelCase versions
				this.style[property] = val[property];
			}
			else {
				// This way we can set CSS Variables too and use normal property names
				this.style.setProperty(property, val[property]);
			}
		}
	},

	// Set a bunch of attributes
	attributes: function (o) {
		for (var attribute in o) {
			this.setAttribute(attribute, o[attribute]);
		}
	},

	// Set a bunch of properties on the element
	properties: function (val) {
		$.extend(this, val);
	},



	once: overload(function(types, callback) {
		var me = this;
		var once = function() {
			$.unbind(me, types, once);

			return callback.apply(me, arguments);
		};

		$.bind(this, types, once, {once: true});
	}, 0),

	// Event delegation
	delegate: overload(function (type, selector, callback) {
		$.bind(this, type, function(evt) {
			if (evt.target.closest(selector)) {
				callback.call(this, evt);
			}
		});
	}, 0, 2),

	// Set the contents as a string, an element, an object to create an element or an array of these
	contents: function (val) {
		if (val || val === 0) {
			(Array.isArray(val)? val : [val]).forEach(function (child) {
				var type = $.type(child);

				if (/^(string|number)$/.test(type)) {
					child = document.createTextNode(child + "");
				}
				else if (type === "object") {
					child = $.create(child);
				}

				if (child instanceof Node) {
					this.appendChild(child);
				}
			}, this);
		}
	},

	// Append the element inside another element
	inside: function (element) {
		element && element.appendChild(this);
	},

	// Insert the element before another element
	before: function (element) {
		element && element.parentNode.insertBefore(this, element);
	},

	// Insert the element after another element
	after: function (element) {
		element && element.parentNode.insertBefore(this, element.nextSibling);
	},

	// Insert the element before another element's contents
	start: function (element) {
		element && element.insertBefore(this, element.firstChild);
	},

	// Wrap the element around another element
	around: function (element) {
		if (element && element.parentNode) {
			$.before(this, element);
		}

		this.appendChild(element);
	}
};

$.Array = function (subject) {
	this.subject = subject;
};

$.Array.prototype = {
	all: function(method) {
		var args = $.$(arguments).slice(1);

		return this[method].apply(this, args);
	}
};

add($.Array.prototype, {element: false});
add($.Element.prototype);
add($.setProps);


// Add native methods on $ and _
var dummy = document.createElement("_");
add($.extend({}, HTMLElement.prototype, function(method) {
	return $.type(dummy[method]) === "function";
}), null, true);


})();
