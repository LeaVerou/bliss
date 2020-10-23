import type from "./type.js";

// Copy properties from one object to another. Overwrites allowed.
// Subtle difference of array vs string whitelist: If property doesn't exist in from, array will not define it.

export default function extend(to, from, whitelist) {
	var whitelistType = type(whitelist);

	if (whitelistType === "string") {
		// To copy gettters/setters, preserve flags etc
		var descriptor = Object.getOwnPropertyDescriptor(from, whitelist);

		if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
			delete to[whitelist];
			Object.defineProperty(to, whitelist, descriptor);
		}
		else {
			to[whitelist] = from[whitelist];
		}
	}
	else if (whitelistType === "array") {
		whitelist.forEach(function(property) {
			if (property in from) {
				extend(to, from, property);
			}
		});
	}
	else {
		for (var property in from) {
			if (whitelist) {
				if (whitelistType === "regexp" && !whitelist.test(property) ||
					whitelistType === "function" && !whitelist.call(from, property)) {
					continue;
				}
			}

			extend(to, from, property);
		}
	}

	return to;
}
