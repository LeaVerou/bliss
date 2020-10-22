// Return a promise that resolves when an event fires, then unbind
export default function (type, test) {
	return new Promise(resolve => {
		this.addEventListener(type, function callee(evt) {
			if (!test || test.call(this, evt)) {
				this.removeEventListener(type, callee);
				resolve(evt);
			}
		});
	});
}
