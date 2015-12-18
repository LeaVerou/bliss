describe('$.once', function() {

	helpers.fixture('core.html');

	var spy;

	beforeEach(function() {
		spy = sinon.spy();
	});

	it('only calls the listener once', function () {
		$.once(document, {'click': spy});
		helpers.click(document);
		helpers.click(document);
		expect(spy.callCount).to.equal(1);
	});


	it('can be called on elements', function () {
		document._.once({'click': spy});
		helpers.click(document);
		helpers.click(document);
		expect(spy.callCount).to.equal(1);
	});


	it('can be called with string as event', function () {
		document._.once('click', spy);
		helpers.click(document);
		helpers.click(document);
		expect(spy.callCount).to.equal(1);
	});

	it('can have multiple keys passed', function () {
		document._.once({'click': spy, 'mousedown': spy});
		helpers.click(document);
		helpers.mouseDown(document);
		expect(spy.callCount).to.equal(2);
	});

});