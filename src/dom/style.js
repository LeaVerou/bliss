// Set a bunch of inline CSS styles
export default function (val) {
	for (let property in val) {
		if (property in this.style) {
			// camelCase versions
			this.style[property] = val[property];
		}
		else {
			// This way we can set CSS Variables too and use normal property names
			this.style.setProperty(property, val[property]);
		}
	}
}
