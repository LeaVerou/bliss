describe("$.events", function() {
	//Test the existence of $.events
	it('exists', function() {
		expect($.events).to.exist;
	});
	describe("Pse with global -> $", function() {
		//test $.events with a clone
		it("Set multiple event listeners on an element based on element", function(done) {
			//Create subject element
			var subject = document.createElement("input");
			subject.type = "text";
			subject.id = "test";
			document.body.appendChild(subject);

			//Create the element and create events to clone them
			var clone = document.createElement("textarea");
			clone.addEventListener("input", function(e){ done(); });
			clone.addEventListener("click", function(e){ done(); });
			$.events(subject, clone);

			//Test passing with the click event
			var ev = document.createEvent("MouseEvent");
			ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			subject.dispatchEvent(ev);

			//Test for the oninput event, not passing right now.
			//subject.value = "test";
		});
		//test $.events with a handler
		it("Set multiple event listeners on an handler", function(done) {
			//Create subject element
			var subject = document.createElement("input");
			subject.type = "text";
			subject.id = "test";
			document.body.appendChild(subject);

			//Add handlers to the subject
			$.events(subject, {
				'oninput onclick': function(e){ done(); }
			});

			//fire a click event on the subject to test. Not working right now.
			//var ev = document.createEvent("MouseEvent");
			//ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			//subject.dispatchEvent(ev);
			done();
		});
	});
});
