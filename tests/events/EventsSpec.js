describe("$.events", function() {

	helpers.fixture('events.html');
	var spy, htmlEvt;


	it('exists', function() {
		expect($.events).to.exist;
	});

	describe("use with global -> $", function() {

		beforeEach(function(){
			spy = sinon.spy();
			htmlEvt = document.createEvent("HTMLEvents");
			htmlEvt.initEvent('input', true, true);
		});

		it("Set multiple event listeners on an element based on element", function(done) {

			var subject = document.querySelector("#textInput");
			var clone = document.querySelector("#textArea");

			clone.addEventListener("input", spy);
			clone.addEventListener("click", spy);

			$.events(subject, clone);

			subject.dispatchEvent(htmlEvt);
			expect(spy.callCount).to.equal(1);

			clone.click();
			expect(spy.callCount).to.equal(2);

			clone.dispatchEvent(htmlEvt);
			expect(spy.callCount).to.equal(3);

			done();

		});


		it("Set multiple event listeners on an handler", function(done) {

			var subject = document.querySelector("#textInput");

			//Add handlers to the subject
			$.events(subject, { 'input click': spy });

			subject.dispatchEvent(htmlEvt);
			expect(spy.callCount).to.equal(1);

			subject.click();
			expect(spy.callCount).to.equal(2);

			done();

		});

	});

});
