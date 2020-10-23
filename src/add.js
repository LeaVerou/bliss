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
export default overload(function(method, callback, on, noOverwrite) {
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

			if (on.array || on.element) {
				$[method] = function () {
					var args = [].slice.apply(arguments);
					var subject = args.shift();
					var Type = on.array && Array.isArray(subject)? "Array" : "Element";

					return $[Type].prototype[method].apply({subject: subject}, args);
				};
			}
		}
	}
}, 0);
