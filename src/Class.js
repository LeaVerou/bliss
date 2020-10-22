import extend from "./extend.js";
import live from "./live.js";
import lazy from "./lazy.js";

const NOOP = function() {};

// Helper for defining OOP-like “classes”
export default function(o) {
	var special = ["constructor", "extends", "abstract", "static"].concat(Object.keys(classProps));
	var init = o.hasOwnProperty("constructor")? o.constructor : NOOP;
	var Class;

	if (arguments.length == 2) {
		// Existing class provided
		Class = arguments[0];
		o = arguments[1];
	}
	else {
		Class = function() {
			if (this.constructor.__abstract && this.constructor === Class) {
				throw new Error("Abstract classes cannot be directly instantiated.");
			}

			Class.super && Class.super.apply(this, arguments);

			init.apply(this, arguments);
		};

		Class.super = o.extends || null;

		Class.prototype = extend(Object.create(Class.super? Class.super.prototype : Object), {
			constructor: Class
		});

		// For easier calling of super methods
		// This doesn't save us from having to use .call(this) though
		Class.prototype.super = Class.super? Class.super.prototype : null;

		Class.__abstract = !!o.abstract;
	}

	var specialFilter = function(property) {
		return this.hasOwnProperty(property) && special.indexOf(property) === -1;
	};

	// Static methods
	if (o.static) {
		extend(Class, o.static, specialFilter);

		for (var property in classProps) {
			if (property in o.static) {
				classProps[property](Class, o.static[property]);
			}
		}
	}

	// Instance methods
	extend(Class.prototype, o, specialFilter);

	for (let property in classProps) {
		if (property in o) {
			classProps[property](Class.prototype, o[property]);
		}
	}

	return Class;
};

// Properties with special handling in classes
export const classProps = {
	lazy,
	live
};
