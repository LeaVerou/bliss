describe("$.live", function () {
	
	it('should exist', function () {
		expect($.live).to.be.defined;
	});

	it('should defined properties', function() {
		var obj = {};
		$.live(obj, 'foo', {
			get: function () { return 'bar'; }
		});
		expect(obj.foo).to.equal('bar');
	});

});