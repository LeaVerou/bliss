describe("$.unbind", function () {

	helpers.fixture('events.html');

	it('exists', function () {
		expect($.unbind).to.exist;
	});

	it("unbind events using namespaces", function (done) {
		// Setup
		var subject = document.querySelector("#simpleDiv");

		var spy1 = sinon.spy();
		var spy2 = sinon.spy();
		var spy3 = sinon.spy();

		subject.addEventListener('click.namespace1.foo', spy1);
		subject.addEventListener('click.namespace1.bar', spy2);
		subject.addEventListener('click.namespace2.bar', spy3);

		// Exercise
		$.unbind(subject, '.namespace1');
		fireEvent(subject, 'click');

		// Verify
		expect(spy1.notCalled).to.be.ok;
		expect(spy2.notCalled).to.be.ok;
		expect(spy3.calledOnce).to.be.ok;

		done();
	});

	function fireEvent(target, eventName) {
		var event = new Event(eventName, {'bubbles': true, 'cancelable': true});
		target.dispatchEvent(event);
	}

});
