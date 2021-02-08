import $ from "./$.js";
import overload from "./overload.js";
import extend from "./extend.js";
import type from "./type.js";

/*
 * Return first non-undefined value.
 */
function defined(...args) {
	return args.find(x => x !== undefined);
}

// Extends Bliss with more methods
function add (method, callback, {element = true, array = true, force} = {}) {
	if (type(callback) == "function") {
		if (element && $.Element && (!(method in $.Element.prototype) || force)) {
			$.Element.prototype[method] = function (...args) {
				return this.subject && defined(callback(this.subject, ...args), this.subject);
			};
		}

		if (array && $.Array && (!(method in $.Array.prototype) || force)) {
			$.Array.prototype[method] = function(...args) {
				return this.subject.map(element => {
					return element && defined(callback(element, ...args), element);
				});
			};
		}

		if (!$[method]) {
			$[method] = callback;
		}
	}
};

export default overload(add, {subject: false, collapsible: [0]});
