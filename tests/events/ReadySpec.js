describe('$.ready', function () {
	it('exists', function () {
		expect($.ready).to.exist;
	});
	it('Test $.ready()', function (done) {
		// Should fire when DOM is ready
		var spy = sinon.spy();

		$.ready().then(function(){
			spy();
			expect(spy.callCount).to.equal(1);
			done();
		});
	});
});
