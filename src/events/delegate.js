import overload from "../overload.js";
import bind from "./bind.js";

function delegate (subject, type, selector, callback) {
	bind(subject, type, function(evt) {
		if (evt.target.closest(selector)) {
			callback.call(subject, evt);
		}
	});
};

export default overload(delegate, {collapsible: [0, 2]});
