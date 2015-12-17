describe("$.overload", function() {
	var spy, func;

	describe("with an index of zero", function() {
		beforeEach(function () {
			spy = sinon.spy();
			func = $.overload(spy, 0);
		});

		it('retains the scope of the original function', function () {
			var that = this;
			var method = $.overload(function() {
				expect(this).to.deep.equal(that);
			});
		});

		it('handles single object as parameter', function() {
			func({key: 'val'}, 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['key', 'val', 'hey', 'there']);
		});

		it('handles string, object as parameters', function() {
			func('key', 'val', 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['key', 'val', 'hey', 'there']);
		});
	});

	describe("with an index of 1", function() {
		beforeEach(function () {
			spy = sinon.spy();
			func = $.overload(spy, 1);
		});

		it('handles single object as parameter', function() {
			func('foo', {key: 'val'}, 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['foo', 'key', 'val', 'hey', 'there']);
		});

		it('handles string, object as parameters', function() {
			func('foo', 'key', 'val', 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['foo', 'key', 'val', 'hey', 'there']);
		});
	});
});