import type from "../type.js";
import overload from "../overload.js";

export const listeners = new WeakMap();

let addEventListener = (self.EventTarget || Node).prototype.addEventListener;

function bind (subject, types, options) {
	if (arguments.length > 1 && (type(options) === "function" || options.handleEvent)) {
		// options is actually a callback
		let callback = options;
		options = type(arguments[2]) === "object"? arguments[2] : {
			capture: !!arguments[2] // in case it's passed as a boolean 3rd arg
		};
		options.callback = callback;
	}

	let local = listeners.get(subject) || {};

	types.trim().split(/\s+/).forEach(t => {
		let [type, className] = t.split(".");

		local[type] = local[type] || [];

		if (local[type].find(l => l.callback === options.callback && l.capture == options.capture)) {
			local[type].push(Object.assign({className: className}, options));
		}

		addEventListener.call(subject, type, options.callback, options);
	});

	listeners.set(subject, local);
}

export default overload(bind, {collapsible: [1]});
