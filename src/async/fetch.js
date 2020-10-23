import extend from "../extend.js";
import $ from "../$.js";

/*
 * Fetch API inspired XHR wrapper. Returns promise.
 */

export default function (url, o) {
	if (!url) {
		throw new TypeError("URL parameter is mandatory and cannot be " + url);
	}

	// Set defaults & fixup arguments
	var env = extend({
		url: new URL(url, location),
		data: "",
		method: "GET",
		headers: {},
		xhr: new XMLHttpRequest()
	}, o);

	env.method = env.method.toUpperCase();

	$.hooks.run("fetch-args", env);

	// Start sending the request

	if (env.method === "GET" && env.data) {
		env.url.search += env.data;
	}

	document.body.setAttribute("data-loading", env.url);

	env.xhr.open(env.method, env.url.href, env.async !== false, env.user, env.password);

	for (var property in o) {
		if (property === "upload") {
			if (env.xhr.upload && typeof o[property] === "object") {
				extend(env.xhr.upload, o[property]);
			}
		}
		else if (property in env.xhr) {
			try {
				env.xhr[property] = o[property];
			}
			catch (e) {
				self.console && console.error(e);
			}
		}
	}

	var headerKeys = Object.keys(env.headers).map(function(key) {
		return key.toLowerCase();
	});

	if (env.method !== "GET" && headerKeys.indexOf("content-type") === -1) {
		env.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}

	for (var header in env.headers) {
		if (env.headers[header] !== undefined) {
			env.xhr.setRequestHeader(header, env.headers[header]);
		}
	}

	var promise = new Promise(function(resolve, reject) {
		env.xhr.onload = function() {
			document.body.removeAttribute("data-loading");

			if (env.xhr.status === 0 || env.xhr.status >= 200 && env.xhr.status < 300 || env.xhr.status === 304) {
				// Success!
				resolve(env.xhr);
			}
			else {
				reject(extend(Error(env.xhr.statusText), {
					xhr: env.xhr,
					get status() {
						return this.xhr.status;
					}
				}));
			}
		};

		env.xhr.onerror = function() {
			document.body.removeAttribute("data-loading");
			reject(extend(Error("Network Error"), {xhr: env.xhr}));
		};

		env.xhr.ontimeout = function() {
			document.body.removeAttribute("data-loading");
			reject(extend(Error("Network Timeout"), {xhr: env.xhr}));
		};

		env.xhr.send(env.method === "GET"? null : env.data);
	});
	// Hack: Expose xhr.abort(), by attaching xhr to the promise.
	promise.xhr = env.xhr;
	return promise;
}
