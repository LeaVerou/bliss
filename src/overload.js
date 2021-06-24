import type from "./type.js";

export default function overload(callback, o = {}) {
	let start, end, levels;

	if (o.collapsible && o.collapsible.length > 0) {
		[start, end] = o.collapsible;
		end = end || start + 1;
		levels = end - start;
	}

	if (o.collapsible && levels > 1) {
		// Only 2 levels supported for now
		let ret = overload(callback, {...o, collapsible: [start + 1, end]});
		return overload(ret, {...o, collapsible: [start, end - 1]});
	}
	else {
		let ret = function callee(subject, ...rest) {
			if (o.subject !== false) {
				// if (Array.isArray(this) || this instanceof Node) {
				// 	subject = this;
				// 	rest.unshift(subject);
				// }

				if (Array.isArray(subject)) {
					return subject.map(s => callee(s, ...rest));
				}
			}
			else {
				rest.unshift(subject);
			}

			let args = o.subject !== false? [subject, ...rest] : rest;

			if (levels > 0 && args.length > start && type(args[start]) === "object") {
				let obj = args[start];

				for (let key in obj) {
					let a = [...args];
					a.splice(start, 1, key, obj[key]);
					callback.apply(this, a);
				}

				return subject;
			}

			return callback.apply(this, args);
		};

		ret.originalFunction = callback;

		return ret;
	}
};

function overload_old(callback, start, end) {
	start = start === undefined ? 1 : start;
	end = end || start + 1;

	if (end - start <= 1) {
		return function() {
			if (arguments.length <= start || type(arguments[start]) === "string") {
				return callback.apply(this, arguments);
			}

			var obj = arguments[start];
			var ret;

			for (var key in obj) {
				var args = Array.from(arguments);
				args.splice(start, 1, key, obj[key]);
				ret = callback.apply(this, args);
			}

			return ret;
		};
	}
	else {
		return overload(overload(callback, start + 1, end), start, end - 1);
	}
}
