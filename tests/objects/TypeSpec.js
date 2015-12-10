describe("$.type function", function() {

	it("returns null if object is null", function() {
		var obj = null;
		expect($.type(obj)).to.equal('null');
	});

	it('returns undefined if undefined', function() {
		var obj = [];
		expect($.type(obj.foo)).to.equal('undefined');
	});

	it('returns correct types for native objects', function() {
		expect($.type(new Date())).to.equal('date');
		expect($.type('hello')).to.equal('string');
		expect($.type(45)).to.equal('number');
	});

	it('returns type function', function() {
		expect($.type($)).to.equal('function');
	});

	it('returns type object', function() {
		expect($.type({})).to.equal('object');
	});

	it('returns nan if NaN', function() {
		var obj = 45 - 'foo';
		expect($.type(obj)).to.equal('nan');
	});

});