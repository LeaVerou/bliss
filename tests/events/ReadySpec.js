describe('$.ready', function () {

	var mocDoc, spy;

	beforeEach(function () {
		mocDoc = document.createElement('div');
		spy = sinon.spy();
	});

	afterEach(function () {
		mocDoc.remove();
	});

	it('exists', function () {
		expect($.ready).to.exist;
		expect($.ready(document) instanceof Promise).to.be.true;
	});

	it('should work with no context passed', function (done) {
		$.ready().then(spy);

		setTimeout(function () {
			expect(spy.calledOnce).to.be.true;
			done();
		}, 1);
	});
	
	// should fire automatically because DOM is already loaded
	it('should fire immediately', function (done) {
		mocDoc.readyState = 'complete';
		
		$.ready(mocDoc).then(spy);

		setTimeout(function () {
			expect(spy.calledOnce).to.be.true;
			done();
		}, 1);
	});

	it('should not call the promise if context is loading', function (done) {
		mocDoc.readyState = 'loading';
		$.ready(mocDoc).then(spy);

		setTimeout(function () {
			expect(spy.callCount).to.equal(0);
			done();
		}, 1);
	});

	it('should trigger the promise to resolve when the event is fired', function (done) {
		mocDoc.readyState = 'loading';
		$.ready(mocDoc).then(spy);

		mocDoc.dispatchEvent(new Event('DOMContentLoaded'));

		setTimeout(function () {
			expect(spy.calledOnce).to.be.true;
			done();
		}, 1);
	});

});
