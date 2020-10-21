import {default as bind, listeners} from "./bind.js";

// Bind one or more events to the element
export default function events (val) {
	if (arguments.length == 1 && val && val.addEventListener) {
		// Copy events from other element

		// Copy local
		if (listeners) {
			let local = listeners.get(val);

			for (let type in local) {
				local[type].forEach(l => bind(this, type, l.callback, l.capture));
			}
		}

		// Copy inline events
		for (let onevent in val) {
			if (onevent.startsWith("on")) {
				this[onevent] = val[onevent];
			}
		}
	}
	else {
		return bind.call(this, this, ...arguments);
	}
}
