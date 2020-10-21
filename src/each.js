export default function (obj, callback, ret) {
	ret = ret || {};

	for (var property in obj) {
		ret[property] = callback.call(obj, property, obj[property]);
	}

	return ret;
}
