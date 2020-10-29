import overload from "../overload.js";

// Set a bunch of inline CSS styles
function style (subject, property, value) {
	if (property in subject.style) {
		// camelCase versions
		subject.style[property] = value;
	}
	else {
		// This way we can set CSS Variables too and use normal property names
		subject.style.setProperty(property, value);
	}
}

export default overload(style, {collapsible: [1]});
