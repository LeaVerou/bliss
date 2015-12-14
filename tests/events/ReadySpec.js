describe('$.ready', function () {
	it('exists', function () {
		expect($.ready).to.exist;
	});
	// Should fire when DOM is ready
	it('Test $.ready()', function (done) {
		var spy = sinon.spy();

		$.ready().then(function(){
			spy();
			expect(spy.callCount).to.equal(1);
			done();
		});
	});
});
