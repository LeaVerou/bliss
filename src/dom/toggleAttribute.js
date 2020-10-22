export default function(name, value, test) {
	if (arguments.length < 3) {
		// No condition was provided, use value
		test = value !== null;
	}

	if (test) {
		this.setAttribute(name, value);
	}
	else {
		this.removeAttribute(name);
	}
}
