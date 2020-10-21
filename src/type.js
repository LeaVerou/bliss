/**
 * Returns the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc)
 */

export default function type(obj) {
	if (obj === null) {
		return "null";
	}

	if (obj === undefined) {
		return "undefined";
	}

	var ret = (Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();

	if (ret == "number" && isNaN(obj)) {
		return "nan";
	}

	return ret;
}
