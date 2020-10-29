import overload from "../overload.js";

function toggleAttribute (subject, name, value, test) {
	if (arguments.length < 4) {
		// No condition was provided, use value
		test = value !== null;
	}

	if (test) {
		subject.setAttribute(name, value);
	}
	else {
		subject.removeAttribute(name);
	}
}

export default overload(toggleAttribute);
