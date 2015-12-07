(function($) {
"use strict";

if (!Bliss || Bliss.shy) {
	return;
}

var _ = Bliss.property;

// Methods requiring Bliss Full
$.add({
	// Clone elements, with events
	clone: function () {
		var clone = this.cloneNode(true);
		var descendants = $.$("*", clone).concat(clone);

		$.$("*", this).concat(this).forEach(function(element, i, arr) {
			$.events(descendants[i], element);
		});

		return clone;
	}
}, {array: false});

// Define the _ property on arrays and elements

Object.defineProperty(Node.prototype, _, {
	get: function () {
		Object.defineProperty(this, _, {
			value: new $.Element(this)
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
	var addEventListener = EventTarget.prototype.addEventListener,
	    removeEventListener = EventTarget.prototype.removeEventListener,
	    filter = function(callback, capture, l){
	    	return !(l.callback === callback && l.capture == capture);
	    };

	EventTarget.prototype.addEventListener = function(type, callback, capture) {
		if (this[_] && callback) {
			var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};
			
			listeners[type] = listeners[type] || [];
			
			if (listeners[type].filter(filter.bind(null, callback, capture)).length === 0) {
				listeners[type].push({callback: callback, capture: capture});
			}
		}

		return addEventListener.call(this, type, callback, capture);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, capture) {
		if (this[_] && callback) {
			var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};

			listeners[type] = listeners[type] || [];
			listeners[type] = listeners[type].filter(filter.bind(null, callback, capture));
		}

		return removeEventListener.call(this, type, callback, capture);
	};
}

// Set $ and $$ convenience methods, if not taken
self.$ = self.$ || $;
self.$$ = self.$$ || $.$;

})(Bliss);