describe("$.live", function () {

	var setSpy, getSpy;

	beforeEach(function () {
		setSpy = sinon.spy();
		getSpy = sinon.spy();
	});
	
	it('should exist', function () {
		expect($.live).to.be.defined;
	});

	it('can take 2 parameters instead of 3', function () {
		var obj = $.live({}, {dog: {enumerable: true}, cat: {enumerable: true}});
		expect(Object.keys(obj)).to.deep.equal(['dog', 'cat']);
	});

	describe('getters and setters', function () {

		it('should define getter and call custom function', function () {			
			var getSpy = sinon.spy(),
				obj = $.live({}, 'pet', {
					get: function (value) {
						getSpy();
						return value + '--suffix';
					},
					set: function (value) {
						setSpy();
						return value.trim();
					}
				});

			obj.pet = ' cat   ';
			expect(setSpy.callCount).to.equal(1);
			expect(obj.pet).to.equal('cat--suffix');
			expect(getSpy.callCount).to.equal(1);
		});

		it('uses original property if "set"', function () {
			var obj = {};

			obj.name = "Freddie";
			// no setter passed
			obj = $.live(obj, 'name', {get: getSpy});

			obj.name;
			expect(getSpy.callCount).to.equal(1);
			expect(getSpy.calledWith('Freddie'));
		});

	});

	describe('enumerable', function () {

		it('adds the property to keys if enumerable', function () {
			var obj = $.live({}, 'pet', {enumerable: true});
			expect(Object.keys(obj)).to.deep.equal(['pet']);
		});

		it('not enumerable by default', function () {
			var obj = $.live({}, 'pet', {});
			expect(Object.keys(obj)).to.be.empty;
		});

	});

	describe('configurable', function () {

		it('can delete the property if configurable', function () {
			var obj = $.live({pet: 'cat'}, 'pet', {configurable: true});
			delete obj.pet;
			expect(obj.hasOwnProperty('pet')).to.be.false;
		});

		it('cannot delete the property if configurable false', function () {
			var obj = $.live({pet: 'cat'}, 'pet', {configurable: false});
			delete obj.pet;
			expect(obj.hasOwnProperty('pet')).to.be.true;
		});

	});

});
