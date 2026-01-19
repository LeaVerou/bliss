import overload from "../overload.js";
import style from "./style.js";
import attributes from "./attributes.js";
import contents from "./contents.js";
import bind from "../events/bind.js";

function set (subject, property, value) {
	if (property in setProps) {
		setProps[property](subject, value);
	}
        else if (property === "dataset") {
		for (const key of Object.keys(value)) {
			subject.dataset[key]=value[key]
		}
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

	once: function (subject, val) {
		return bind(subject, val, {once: true});
	},

	// Why not simply contents? To avoid Uncaught ReferenceError: Cannot access "contents" before initialization.
	contents: function (...args) {
		contents(...args);
	},

	// Set a bunch of properties on the element
	properties: function (subject, val) {
		Object.assign(subject, val);
	},

	// Append the element inside another element
	inside: function (subject, element) {
		element.append(subject);
	},

	// Insert element before this
	before: function (subject, element) {
		if (this.before) {
			element.before(subject);
		}
	},

	// Insert the element after another element
	after: function (subject, element) {
		if (element.after) {
			element.after(subject);
		}
	},

	// Insert the element before another element's contents
	start: function (subject, element) {
		if (element) {
			element.insertBefore(subject, element.firstChild);
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
