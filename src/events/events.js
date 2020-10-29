import overload from "../overload.js";
import {default as bind, listeners} from "./bind.js";

// Bind one or more events to the element
function events (subject, val) {
	if (arguments.length == 1 && val && val.addEventListener) {
		// Copy events from other element

		// Copy local
		if (listeners) {
			let local = listeners.get(val);

			for (let type in local) {
				local[type].forEach(l => bind(subject, type, l.callback, l.capture));
			}
		}

		// Copy inline events
		for (let onevent in val) {
			if (onevent.startsWith("on")) {
				subject[onevent] = val[onevent];
			}
		}
	}
	else {
		return bind.call(subject, subject, ...arguments);
	}
}

export default overload(events);
