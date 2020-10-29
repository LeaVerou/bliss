import type from "../type.js";
import extend from "../extend.js";
import overload from "../overload.js";

import {default as bind, listeners} from "./bind.js";

let removeEventListener = (self.EventTarget || Node).prototype.removeEventListener;

function unbind (subject, types, options) {
	if (options && (type(options) === "function" || options.handleEvent)) {
		var callback = options;
		options = arguments[2];
	}

	if (type(options) == "boolean") {
		options = {capture: options};
	}

	options = options || {};
	options.callback = options.callback || callback;

	var local = listeners.get(subject);

	(types || "").trim().split(/\s+/).forEach(t => {
		let [type, className] = t.split(".");

		// if listeners exist, always go through listeners to clean up
		if (!local) {
			if (type && options.callback) {
				return removeEventListener.call(subject, type, options.callback, options.capture);
			}
			return;
		}

		// Mass unbinding, need to go through listeners
		for (let ltype in local) {
			if (!type || ltype === type) {
				// No forEach, because we’re mutating the array
				for (let i=0, l; l=local[ltype][i]; i++) {
					if ((!className || className === l.className)
						&& (!options.callback || options.callback === l.callback)
						&& (!!options.capture == !!l.capture ||
								!type && !options.callback && undefined === options.capture)
					   ) {
							local[ltype].splice(i, 1);
							removeEventListener.call(subject, ltype, l.callback, l.capture);
							i--;
					}
				}
			}
		}
	});
}

export {listeners};
export default overload(unbind, {collapsible: [1]});
