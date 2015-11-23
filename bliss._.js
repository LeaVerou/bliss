(function($) {
"use strict";

if (!Bliss || Bliss.shy) {
	return;
}

// Define the _ property on arrays and elements
if (!shy) {
	Object.defineProperty(Node.prototype, "_", {
		get: function () {
			Object.defineProperty(this, "_", {
				value: new $.Element(this)
			});
			
			return this._;
		},
		configurable: true
	});

	Object.defineProperty(Array.prototype, "_", {
		get: function () {
			Object.defineProperty(this, "_", {
				value: new $.Array(this)
			});
			
			return this._;
		},
		configurable: true
	});

	// Hijack addEventListener and removeEventListener to store callbacks

	if (self.EventTarget && "addEventListener" in EventTarget.prototype) {
		var addEventListener = EventTarget.prototype.addEventListener,
		    removeEventListener = EventTarget.prototype.removeEventListener,
		    filter = function(callback, capture, l){
		    	return !(l.callback === callback && l.capture == capture);
		    };

		EventTarget.prototype.addEventListener = function(type, callback, capture) {
			if (this._) {
				var listeners = this._.bliss.listeners = this._.bliss.listeners || {};
				
				listeners[type] = listeners[type] || [];

				var fired = this._.bliss.fired = this._.bliss.fired || {};
				fired[type] = fired[type] || 0;
				
				var oldCallback = callback;
				callback = function() {
					this._.bliss.fired[type]++;

					return oldCallback.apply(this, arguments)
				};
				oldCallback.callback = callback;
				
				if (listeners[type].filter(filter.bind(null, callback, capture)).length === 0) {
					listeners[type].push({callback: oldCallback, capture: capture});
				}
			}

			return addEventListener.call(this, type, callback, capture);
		};

		EventTarget.prototype.removeEventListener = function(type, callback, capture) {
			if (this._) {
				var listeners = this._.bliss.listeners = this._.bliss.listeners || {};

				var oldCallback = callback;
				callback = oldCallback.callback;

				listeners[type] = listeners[type] || [];
				listeners[type] = listeners[type].filter(filter.bind(null, callback, capture));
			}

			return removeEventListener.call(this, type, callback, capture);
		};
	}

	// Set $ and $$ convenience methods, if not taken
	self.$ = self.$ || $;
	self.$$ = self.$$ || $.$;
}

})(Bliss);