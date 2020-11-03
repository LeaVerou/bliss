import $ from "./_index.js";
import add from "./add.js";
import * as dom from "./dom/index.js";
import * as async from "./async/index.js";
import * as events from "./events/index.js";

let _ = $.property;

$.Element = function (subject) {
	this.subject = subject;

	// Author-defined element-related data
	this.data = {};

	// Internal Bliss element-related data
	this.bliss = {};
};

$.Element.prototype = {
	...dom,
	...events
};

$.Array = function (subject) {
	this.subject = subject;
};

$.Array.prototype = {
	all: function(method) {
		var args = Array.from(arguments).slice(1);

		return this[method].apply(this, args);
	}
};

add($.Array.prototype, {element: false});
add($.Element.prototype);

// // Add native methods on $ and _
// var dummy = document.createElement("_");
// add($.extend({}, HTMLElement.prototype, function(method) {
// 	return $.type(dummy[method]) === "function";
// }), null, true);

// Define the _ property on arrays and elements

Object.defineProperty(Node.prototype, _, {
	// Written for IE compatability (see #49)
	get: function getter () {
		Object.defineProperty(Node.prototype, _, {
			get: undefined
		});
		Object.defineProperty(this, _, {
			value: new $.Element(this)
		});
		Object.defineProperty(Node.prototype, _, {
			get: getter
		});
		return this[_];
	},
	configurable: true
});

Object.defineProperty(Array.prototype, _, {
	get: function () {
		Object.defineProperty(this, _, {
			value: new $.Array(this)
		});

		return this[_];
	},
	configurable: true
});
