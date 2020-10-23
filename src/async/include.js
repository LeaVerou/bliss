import set from "../dom/set.js";

// Includes a script, returns a promise
export default function() {
	var url = arguments[arguments.length - 1];
	var loaded = arguments.length === 2? arguments[0] : false;

	var script = document.createElement("script");

	return loaded? Promise.resolve() : new Promise(function(resolve, reject) {
		set(script, {
			async: true,
			onload: function() {
				resolve(script);
				script.remove();
			},
			onerror: function() {
				reject(script);
			},
			src: url,
			inside: document.head
		});
	});
}
