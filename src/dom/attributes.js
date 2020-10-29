import overload from "../overload.js";

// Mass set attributes
function attributes (subject, o) {
	for (let attribute in o) {
		subject.setAttribute(attribute, o[attribute]);
	}
}

export default overload(attributes);
