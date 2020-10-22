import type from "../type.js";
import create from "./create.js";

// Set the contents as a string, an element, an object to create an element or an array of these
export default function (val) {
	if (val || val === 0) {
		(Array.isArray(val)? val : [val]).forEach(function (child) {
			var type = type(child);

			if (type === "object") {
				child = create(child);
			}

			if (/^(string|number)$/.test(type) || child instanceof Node) {
				this.append(child);
			}
		}, this);
	}
}
