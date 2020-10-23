import include from "./include.js";
import create from "../dom/create.js";

// Dynamically load a CSS or JS resource
export default function load(url, base) {
	base = base? new URL(base, location.href) : location.href;
	url = new URL(url, base);

	// Prevent double loading
	var loading = load.loading = load.loading || {};

	if (loading[url + ""]) {
		return loading[url + ""];
	}

	if (/\.css$/.test(url.pathname)) {
		// CSS file
		return loading[url + ""] = new Promise(function(resolve, reject) {
			var link = create("link", {
				"href": url,
				"rel": "stylesheet",
				"inside": document.head,
				onload: function() {
					resolve(link);
				},
				onerror: function() {
					reject(link);
				}
			});
		});
	}

	// JS file
	return loading[url + ""] = include(url);
};
