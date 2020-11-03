import overload from "../overload.js";
import style from "./style.js";
import attributes from "./attributes.js";
import contents from "./contents.js";
import bind from "../events/bind.js";

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

/*
 * Properties with custom handling in $.set()
 * Also available as individual functions
 */
const setProps = {
	style,
	attributes,
	events: bind,
	//contents,

	// Set a bunch of properties on the element
	properties: function (val) {
		Object.assign(this, val);
	},

	// Append the element inside another element
	inside: function (element) {
		element.append(this);
	},

	// Insert element before this
	before: function (element) {
		if (this.before) {
			element.before(this);
		}
	},

	// Insert the element after another element
	after: function (element) {
		if (element.after) {
			element.after(this);
		}
	},

	// Insert the element before another element's contents
	start: function (element) {
		if (element) {
			element.insertBefore(this, element.firstChild);
		}
	},

	// Wrap the subject around another element
	around: function around (subject, element) {
		element.replaceWith(subject);
		subject.append(element);
	}
};

for (let prop in setProps) {
	if (!setProps[prop].originalFunction) {
		setProps[prop] = overload(setProps[prop]);
	}
}

// Aliases
Object.assign(setProps, {
	end: setProps.inside,
	wrap: setProps.around
});

export default overload(set, {
	collapsible: [1]
});

export {setProps};
export {style, attributes, contents};
export const {inside, before, after, start, around} = setProps;
