import type from "./type.js";

export default function(expr, context) {
	if (arguments.length == 2 && !context || !expr) {
		return null;
	}

	return type(expr) === "string"? (context || document).querySelector(expr) : expr || null;
};
