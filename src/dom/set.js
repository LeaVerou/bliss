import overload from "../overload.js";
import extend from "../extend.js";
import style from "./style.js";
import attributes from "./attributes.js";
import events from "../events/events.js";
import contents from "./contents.js";

function set (subject, property, value) {
	if (property in setProps) {
		setProps[property](subject, value);
	}
	else if (property in subject) {
		subject[property] = value;
	}
	else {
		subject.setAttribute(property, value);
	}
};

// Set a bunch of properties on the element
export function properties (subject, val) {
	Object.assign(subject, val);
}

// Append the element inside another element
export function inside (subject, element) {
	element.append(subject);
}

// Insert element before subject
export function before (subject, element) {
	if (subject.before) {
		element.before(subject);
	}
}

// Insert the element after another element
export function after (subject, element) {
	if (element.after) {
		element.after(subject);
	}
}

// Insert the element before another element's contents
export function start (subject, element) {
	if (element) {
		element.insertBefore(subject, element.firstChild);
	}
}

// Wrap the subject around another element
export function around (subject, element) {
	element.replaceWith(subject);
	subject.append(element);
}

/*
 * Properties with custom handling in $.set()
 * Also available as individual functions
 */
const setProps = {
	style,
	attributes, properties,
	events,
	contents,


	inside, before, after, start, end: inside, around
};

for (let prop in setProps) {
	if (!setProps[prop].originalFunction) {
		setProps[prop] = overload(setProps[prop]);
	}
}

export default overload(set, {
	collapsible: [1]
});
export {setProps};
