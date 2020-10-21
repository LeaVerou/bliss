// Fire a synthesized event on the element
export default function (type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	// Return the result of dispatching the event, so we
	// can know if `e.preventDefault` was called inside it
	return this.dispatchEvent($.extend(evt, properties));
}
