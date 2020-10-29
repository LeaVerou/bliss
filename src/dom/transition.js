import overload from "../overload.js";
import extend from "../extend.js";
import style from "./style.js";

// Run a CSS transition, return promise
function transition (subject, props, duration) {
	return new Promise(function(resolve, reject) {
		if ("transition" in subject.style && duration !== 0) {
			// Get existing style
			var previous = extend({}, subject.style, /^transition(Duration|Property)$/);

			style(subject, {
				transitionDuration: (duration || 400) + "ms",
				transitionProperty: Object.keys(props).join(", ")
			});

			subject.addEventListener("transitionend", function() {
				clearTimeout(i);
				style(subject, previous);
				resolve(subject);
			}, {once: true});

			// Failsafe, in case transitionend doesn’t fire
			var i = setTimeout(resolve, duration + 50, subject);

			style(subject, props);
		}
		else {
			style(subject, props);
			resolve(subject);
		}
	});
}

export default overload(transition);
