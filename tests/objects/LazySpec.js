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
			var obj = {foo: 'bar'},
				spy = sinon.spy;

			obj = $.lazy(obj, 'foo', function() {
				spy();
				return 'not bar';	
			});

			obj.foo;
			expect(obj.foo).to.not.equal('bar');
			obj.foo;
			expect(spy.calledOnce).to.equal.true;
		});
	});

	describe('the method defined via $.lazy', function() {
		it('will always return the first value returned', function() {
			var spy = sinon.spy(),
				obj = $.lazy(testObj, 'pets', function () { 
				spy();
				// return cloned array...
				return this.animals.slice(0);
			});

			expect(obj.pets).to.deep.equal(obj.animals);
			obj.animals.push('dogs');
			// still only one item returned 
			expect(obj.pets.length).to.equal(1);
			expect(spy.calledOnce).to.be.true;
		})

		it('will return updated values if returning an obj property', function() {
			var spy = sinon.spy(),
				obj = $.lazy(testObj, 'pets', function () { 
				spy();
				return this.animals;
			});

			expect(obj.pets).to.deep.equal(obj.animals);
			obj.animals.push('dogs');
			expect(obj.pets).to.deep.equal(obj.animals);
			expect(spy.calledOnce).to.be.true;
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
