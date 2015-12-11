(function () {
	"use strict";

	window.helpers = {
		initMouseEvent: function(element, type) {
			var ev = document.createEvent("MouseEvent");
			ev.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			return element.dispatchEvent(ev);
		},

		click: function(element) {
			return helpers.initMouseEvent(element, "click");
		},

		mouseDown: function(element) {
			return helpers.initMouseEvent(element, "mousedown");
		},

		mouseUp: function(element) {
			return helpers.initMouseEvent(element, "mouseup");
		}
	};

}());

