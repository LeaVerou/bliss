import overload from "../overload.js";

// Return a promise that resolves when an event fires, then unbind
function when (subject, type, test) {
	return new Promise(resolve => {
		subject.addEventListener(type, function callee(evt) {
			if (!test || test.call(subject, evt)) {
				subject.removeEventListener(type, callee);
				resolve(evt);
			}
		});
	});
}

export default overload(when);
