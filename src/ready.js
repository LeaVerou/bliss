export default function ready (doc = document, callback, _isVoid) {
	if (typeof doc === "function" && !callback) {
		[callback, doc] = [doc];
	}

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
