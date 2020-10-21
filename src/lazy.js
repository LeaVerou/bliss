import overload from "./overload.js";

// Lazily evaluated properties
export default overload(function(obj, property, getter) {
	Object.defineProperty(obj, property, {
		get: function() {
			var value = getter.call(this);

			Object.defineProperty(this, property, {
				value: value,
				configurable: true,
				enumerable: true,
				writable: true
			});

			return value;
		},
		set: function(value) {
			// Blind write: skip running the getter
			Object.defineProperty(this, property, {
				value: value,
				configurable: true,
				enumerable: true,
				writable: true
			});
		},
		configurable: true,
		enumerable: true
	});

	return obj;
});
