export default function (obj) {
	var hasRoot = typeof obj !== "string";

	return Array.from(arguments).slice(+hasRoot).reduce(function(obj, property) {
		return obj && obj[property];
	}, hasRoot? obj : self);
}
