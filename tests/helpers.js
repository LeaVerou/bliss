function initMouseEvent(element, type) {
	var ev = document.createEvent("MouseEvent");
	ev.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return element.dispatchEvent(ev);
}

function click(element) {
	return initMouseEvent(element, "click");
}

function mouseDown(element) {
	return initMouseEvent(element, "mousedown");
}

function mouseUp(element) {
	return initMouseEvent(element, "mouseup");
}
