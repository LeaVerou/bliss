import $ from "./$.js";
import overload from "./overload.js";
import extend from "./extend.js";
import type from "./type.js";

const sources = {};

/*
 * Return first non-undefined value.
 */
function defined() {
	for (var i=0; i<arguments.length; i++) {
		if (arguments[i] !== undefined) {
			return arguments[i];
		}
	}
}

// Extends Bliss with more methods
function add (method, callback, on, noOverwrite) {
	on = Object.assign({$: true, element: true, array: true}, on);

	if (type(callback) == "function") {
		if (on.element && (!(method in $.Element.prototype) || !noOverwrite)) {
			$.Element.prototype[method] = function () {
				return this.subject && defined(callback.apply(this.subject, arguments), this.subject);
			};
		}

		if (on.array && (!(method in $.Array.prototype) || !noOverwrite)) {
			$.Array.prototype[method] = function() {
				var args = arguments;
				return this.subject.map(element => {
					return element && defined(callback.apply(element, args), element);
				});
			};
		}

		if (on.$) {
			sources[method] = $[method] = callback;
		}
	}
};

export default overload(add, {subject: false, collapsible: [0]});
