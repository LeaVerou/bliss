export default overload(function(property, value) {
	if (property in $.setProps) {
		$.setProps[property].call(this, value);
	}
	else if (property in this) {
		this[property] = value;
	}
	else {
		this.setAttribute(property, value);
	}

}, 0);
