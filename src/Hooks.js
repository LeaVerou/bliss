export default class Hooks {
	add (name, callback, first) {
		if (typeof arguments[0] != "string") {
			// Multiple hooks
			for (let name in arguments[0]) {
				this.add(name, arguments[0][name], arguments[1]);
			}

			return;
		}

		(Array.isArray(name)? name : [name]).forEach(function(name) {
			this[name] = this[name] || [];

			if (callback) {
				this[name][first? "unshift" : "push"](callback);
			}
		}, this);
	}

	run (name, env) {
		this[name] = this[name] || [];
		this[name].forEach(function(callback) {
			callback.call(env && env.context? env.context : env, env);
		});
	}
}
