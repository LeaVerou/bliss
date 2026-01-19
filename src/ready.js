export default function ready (doc, callback, _isVoid) {
	if (typeof doc === "function" && !callback) {
		[callback, doc] = [doc];
	}
	doc = doc || document;

	if (callback) {
		if (doc.readyState !== "loading") {
			callback();
		}
		else {
			doc.addEventListener("DOMContentLoaded", function() {
				callback();
			}, {once: true});
		}
	}

	if (!_isVoid) {
		return new Promise(function(resolve) {
			ready(doc, resolve, true);
		});
	}
}
