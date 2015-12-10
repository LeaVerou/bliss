describe('$.lazy', function() {

	var TestClass, testObj;

	beforeEach(function() {
		TestClass = function () { return this; };
		testObj = {animals: ["kittens"]};
	});	
	
	it('exists', function() {
		expect($.lazy).to.exist;
	});

	describe('returns type of object passed, but with function', function() {
		it('returns the same type of instantiated class passed', function() {
			var spy = sinon.spy(),
				obj = $.lazy(new TestClass(), 'pets', spy);

			expect(obj instanceof TestClass).to.be.true;
			expect(obj.pets).to.be.defined;
			expect(spy.calledOnce).to.equal.true;
		});

		it('returns the same Object passed', function() {
			var spy = sinon.spy(),
				obj = $.lazy(testObj, 'pets', spy);

			expect(obj.animals).to.deep.equal(['kittens']);
			expect(obj.pets).to.be.defined;
			expect(spy.calledOnce).to.equal.true;
		});

		it('deletes the property if exists when getter is called', function() {
			var stub = sinon.stub().returns('no bar'),
				obj = $.lazy({foo: 'bar'}, 'foo', stub);

			obj.foo;
			expect(obj.foo).to.not.equal('bar');
			obj.foo;
			expect(stub.calledOnce).to.equal.true;
		});

		it('overwrites a prototype property if exists', function() {
			var klass = $.extend(TestClass, {pet: 'dog'});
			var stub = sinon.stub().returns('bird'),
				result = $.lazy((new klass()), 'pet', stub);

			expect(result.pet).to.equal('bird');
		});

		it('overwrites multiple prototype properties if exists', function() {
			TestClass.prototype.pet = 'dog';
			TestClass.prototype.food = 'pizza';

			var petStub = sinon.stub().returns('snake'),
				foodStub = sinon.stub().returns('pie'),
				inst = $.lazy((new TestClass()), {pet: petStub, food: foodStub});

			expect(inst.pet).to.equal('snake');
			expect(inst.food).to.equal('pie');
		});
	});

	describe('the method defined via $.lazy', function() {
		it('will always return the first value returned', function() {
			var stub = sinon.stub().returns(testObj.animals.slice(0)),
				obj = $.lazy(testObj, 'pets', stub);

			expect(obj.pets).to.deep.equal(obj.animals);
			obj.animals.push('dogs');
			// still only one item returned 
			expect(obj.pets.length).to.equal(1);
			expect(stub.calledOnce).to.be.true;
		});

		it('will return updated values if returning an obj property', function() {
			var stub = sinon.stub().returns(testObj.animals),
				obj = $.lazy(testObj, 'pets', stub);

			expect(obj.pets).to.deep.equal(obj.animals);
			obj.animals.push('dogs');
			expect(obj.pets).to.deep.equal(obj.animals);
			expect(stub.calledOnce).to.be.true;
		});
	
		it('can take an object as the property parameter', function() {
			var spy1 = sinon.spy(), 
				spy2 = sinon.spy(),
				obj = $.lazy(testObj, {cats: spy1, dogs: spy2});

			expect(obj.cats).to.be.defined;
			expect(obj.dogs).to.be.defined;
			
			obj.cats;
			obj.cats;
			obj.dogs;
			obj.dogs;

			expect(spy1.calledOnce).to.be.true;
			expect(spy2.calledOnce).to.be.true;
		});

	});

});
