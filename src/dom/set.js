import overload from "../overload.js";
import extend from "../extend.js";
import style from "./style.js";
import attributes from "./attributes.js";
import events from "../events/events.js";
import contents from "./contents.js";

export default function set(subject, property, value) {
	if (property in setProps) {
		setProps[property].call(this, value);
	}
	else if (property in this) {
		this[property] = value;
	}
	else {
		this.setAttribute(property, value);
	}
};

/*
 * Properties with custom handling in $.set()
 * Also available as functions directly on element._ and on $
 */
export const setProps = {
	style,
	attributes,
	events,
	contents,

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

	// Wrap the this around another element
	around: function (element) {
		element.replaceWith(this);
		this.append(child);
	}
};
