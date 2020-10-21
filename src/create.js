import set from "./dom/set.js";
import type from "./type.js";
import extend from "./extend.js";

export default function (tag, o) {
	if (tag instanceof Node) {
		return set(tag, o);
	}

	// 4 signatures: (tag, o), (tag), (o), ()
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

	return set(document.createElement(tag || "div"), o);
}
