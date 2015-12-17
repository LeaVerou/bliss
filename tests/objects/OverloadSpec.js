describe("$.overload", function() {
	var spy, funct;

	describe("with an index of zero", function() {
		beforeEach(function () {
			spy = sinon.spy();
			funct = $.overload(spy, 0);
		});

		it('retains the scope of the original function', function () {
			var that = this;
			var method = $.overload(function() {
				expect(this).to.deep.equal(that);
			});
		});

		it('handles single object as parameter', function() {
			funct({key: 'val'}, 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['key', 'val', 'hey', 'there']);
		});

		it('handles string, object as parameters', function() {
			funct('key', 'val', 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['key', 'val', 'hey', 'there']);
		});
	});

	describe('nested objects', function() {

		beforeEach(function () {
			spy = sinon.spy();
			funct = $.overload(spy, 1);
		});
		
		it('can take a nested object', function() {
			funct('before', {key: {}}, 'after');
			expect(spy.args[0]).to.deep.equal(['before', 'key', {}, 'after']);
		});

		it('can unfold two depths', function() {
			funct('before', {
				"mousedown": {"a": '', "span": '', "img": ''},
				"mouseup": {"a": '', "span": '', "img": ''}
			});

			expect(spy.args[0][1]).to.deep.equal("mousedown");
			expect($.type(spy.args[0][2])).to.equal('object');
		});
	});

	describe("with an index of 1", function() {
		beforeEach(function () {
			spy = sinon.spy();
			funct = $.overload(spy, 1);
		});

		it('handles single object as parameter', function() {
			funct('foo', {key: 'val'}, 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['foo', 'key', 'val', 'hey', 'there']);
		});

		it('handles string, object as parameters', function() {
			funct('foo', 'key', 'val', 'hey', 'there');
			expect(spy.args[0]).to.deep.equal(['foo', 'key', 'val', 'hey', 'there']);
		});
	});
});