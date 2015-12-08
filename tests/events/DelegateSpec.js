describe("$.delegate", function() {
	it("adds event to children of the subject", function(done) {
		var subject = document.createElement("div");
		document.body.appendChild(subject);

		var inner = document.createElement("a");
		subject.appendChild(inner);

		$.delegate(subject, "click", "a", function() {
			done();
		});

		var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		inner.dispatchEvent(ev);
	});
});
