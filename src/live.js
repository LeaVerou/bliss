import type from "./type.js";
import overload from "./overload.js";

// Properties that behave like normal properties but also execute code upon getting/setting
function live (obj, property, descriptor) {
	if (type(descriptor) === "function") {
		descriptor = {set: descriptor};
	}

	Object.defineProperty(obj, property, {
		get: function() {
			var value = this["_" + property];
			var ret = descriptor.get && descriptor.get.call(this, value);
			return ret !== undefined? ret : value;
		},
		set: function(v) {
			var value = this["_" + property];
			var ret = descriptor.set && descriptor.set.call(this, v, value);
			this["_" + property] = ret !== undefined? ret : v;
		},
		configurable: descriptor.configurable,
		enumerable: descriptor.enumerable
	});

	return obj;
}

export default overload(live, {collapsible: [1]});
