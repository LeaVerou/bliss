import extend from "../extend.js";
import style from "./style.js";
import attributes from "./attributes.js";
import events from "../events/events.js";
import contents from "./contents.js";

export default overload(function(property, value) {
	if (property in setProps) {
		setProps[property].call(this, value);
	}
	else if (property in this) {
		this[property] = value;
	}
	else {
		this.setAttribute(property, value);
	}
}, 0);

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
		extend(this, val);
	},

	// Append the element inside another element
	inside: function (element) {
		this.insertAdjacentElement("beforeend", element);
	},

	// Insert element before this
	before: function (element) {
		this.insertAdjacentElement("beforebegin", element);
	},

	// Insert the element after another element
	after: function (element) {
		this.insertAdjacentElement("afterend", element);
	},

	// Insert the element before another element's contents
	start: function (element) {
		this.insertAdjacentElement("afterbegin", element);
	},

	// Wrap the this around another element
	around: function (element) {
		element.replaceWith(this);
		this.append(child);
	}
};
