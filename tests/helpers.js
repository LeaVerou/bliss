(function () {
	"use strict";

	fixture.setBase("tests/fixtures");

	window.helpers = {
		fixture: function(name) {
			beforeEach(function() {
				this.fixture = fixture.load(name);
			});
			afterEach(function() {
				fixture.cleanup();
			});
		},

		initMouseEvent: function(element, type) {
			var ev = document.createEvent("MouseEvent");
			ev.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			return element.dispatchEvent(ev);
		},

		click: function(element) {
			return helpers.initMouseEvent(element, "click");
		},

		nodesToArray: function (nodes) {
			return Array.prototype.slice.call(nodes);
		},

		mouseDown: function(element) {
			return helpers.initMouseEvent(element, "mousedown");
		},

		mouseUp: function(element) {
			return helpers.initMouseEvent(element, "mouseup");
		}
	};

}());

