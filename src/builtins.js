import $ from "./$.js";
import add from "./add.js";
import type from "./type.js";
import extend from "./extend.js";

// Add native methods on $ and _
let dummy = document.createElement("_");

for (let method in HTMLElement.prototype) {
	let callback = dummy[method];

	if (type(callback) === "function" && !(method in $)) {
		add(method, callback, null, true);
	}
}
