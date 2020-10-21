export default function(expr, context) {
	if (expr instanceof Node || expr instanceof Window) {
		return [expr];
	}

	if (arguments.length == 2 && !context) {
		return [];
	}

	return Array.prototype.slice.call(typeof expr == "string"? (context || document).querySelectorAll(expr) : expr || []);
};
