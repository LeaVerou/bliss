import set from "./set.js";
import type from "../type.js";
import extend from "../extend.js";

export default function (tag, o) {
	// 4 signatures: (tag, o), (tag), (o), ()
	if (arguments.length === 0) {
		o = {};
	}

	if (arguments.length === 1) {
		if (type(tag) === "string") {
			o = {};
		}
		else {
			o = tag;
			tag = o.tag;
			o = extend({}, o, function(property) {
				return property !== "tag";
			});
		}
	}

	let element = tag instanceof Node? tag : document.createElement(tag || "div");

	return set(element, o);
}
