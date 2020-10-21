import extend from "../extend.js";
import style from "./style.js";

// Run a CSS transition, return promise
export default function(props, duration) {
	return new Promise(function(resolve, reject) {
		if ("transition" in this.style && duration !== 0) {
			// Get existing style
			var previous = extend({}, this.style, /^transition(Duration|Property)$/);

			style(this, {
				transitionDuration: (duration || 400) + "ms",
				transitionProperty: Object.keys(props).join(", ")
			});

			this.addEventListener("transitionend", function() {
				clearTimeout(i);
				style(this, previous);
				resolve(this);
			}, {once: true});

			// Failsafe, in case transitionend doesn’t fire
			var i = setTimeout(resolve, duration + 50, this);

			style(this, props);
		}
		else {
			style(this, props);
			resolve(this);
		}
	}.bind(this));
}
