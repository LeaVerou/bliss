import * as $ from "./_index.js";

var _ = $.property;

// Define the _ property on arrays and elements

Object.defineProperty(Node.prototype, _, {
	// Written for IE compatability (see #49)
	get: function getter () {
		Object.defineProperty(Node.prototype, _, {
			get: undefined
		});
		Object.defineProperty(this, _, {
			value: new $.Element(this)
		});
		Object.defineProperty(Node.prototype, _, {
			get: getter
		});
		return this[_];
	},
	configurable: true
});

Object.defineProperty(Array.prototype, _, {
	get: function () {
		Object.defineProperty(this, _, {
			value: new $.Array(this)
		});

		return this[_];
	},
	configurable: true
});

// Hijack addEventListener and removeEventListener to store callbacks

if (self.EventTarget && "addEventListener" in EventTarget.prototype) {
	EventTarget.prototype.addEventListener = function(type, callback, options) {
		return $.bind(this, type, callback, options);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, options) {
		return $.unbind(this, type, callback, options);
	};
}

// Set $ and $$ convenience methods, if not taken
self.$ = self.$ || $;
self.$$ = self.$$ || $.$;

})(Bliss);
