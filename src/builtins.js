import $ from "./$.js";
import add from "./add.js";
import type from "./type.js";
import overload from "./overload.js";

// Add native methods on $ and _
let dummy = document.createElement("_");

for (let property in HTMLElement.prototype) {
	let method = dummy[property];

	if (type(method) === "function" && !(property in $)) {
		let wrappedMethod = overload(function(subject, ...args) {
			method.call(subject, ...args);
		});

		add(property, wrappedMethod);
	}
}
