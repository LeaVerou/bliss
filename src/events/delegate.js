import bind from "./bind.js";

export default overload(function (type, selector, callback) {
	bind(this, type, function(evt) {
		if (evt.target.closest(selector)) {
			callback.call(this, evt);
		}
	});
}, 0, 2);
