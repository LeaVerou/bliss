import overload from "../overload.js";

// Fire a synthesized event on the element
function fire (subject, type, properties) {
	// TODO provide a way to fire other types of events
	let evt = new CustomEvent({bubbles: true, cancelable: true});

	if (properties) {
		Object.assign(evt, properties);
	}

	// Return the result of dispatching the event, so we
	// can know if `e.preventDefault` was called inside it
	return subject.dispatchEvent(evt);
}

export default overload(fire);
