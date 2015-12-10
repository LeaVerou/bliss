describe("$.events", function() {

	it('exists', function() {
		expect($.events).to.exist;
	});

	describe("use with global -> $", function() {

		it("Set multiple event listeners on an element based on element", function(done) {

			//Create elements
			var subject = document.createElement("input");
			var clone = document.createElement("textarea");
			var htmlEvt = document.createEvent("HTMLEvents");
			var spy = sinon.spy();

			// Add properties to the input and add it to the body.
			subject.type = "text";
			subject.id = "test";
			document.body.appendChild(subject);

			htmlEvt.initEvent('input', true, true);

			clone.addEventListener("input", spy);
			clone.addEventListener("click", spy);

			$.events(subject, clone);

			subject.value = 'test';
			subject.dispatchEvent(htmlEvt);

			expect(spy.callCount).to.be.equal(1);

			clone.click();

			expect(spy.callCount).to.equal(2);

			clone.value = 'testclone';
			clone.dispatchEvent(htmlEvt);

			expect(spy.callCount).to.equal(3);

			done();

		});


		it("Set multiple event listeners on an handler", function(done) {

			var subject = document.createElement("input");
			var htmlEvt = document.createEvent("HTMLEvents");
			var spy = sinon.spy();

			subject.type = "text";
			subject.id = "test";
			document.body.appendChild(subject);

			htmlEvt.initEvent('input', true, true);

			//Add handlers to the subject
			$.events(subject, { 'input click': spy });

			subject.value = 'test';
			subject.dispatchEvent(htmlEvt);

			expect(spy.callCount).to.be.equal(1);

			subject.click();

			expect(spy.callCount).to.be.equal(2);

			done();

		});

	});

});
