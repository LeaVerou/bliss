describe("$.fire", function() {

	it("exists", function() {
		expect($.fire).to.exist;
	});

	describe("Test fire event", function() {

		it("Test without params", function(done) {

			//Create elements
			var subject = document.createElement("input");
			var spy = sinon.spy();

			// Add properties to the input and add it to the body.
			subject.type = "text";
			subject.id = "test";
			document.body.appendChild(subject);

			//Add event listener on click event without params
			subject.addEventListener("click", spy);


			$.fire(subject, "click");

			expect(spy.callCount).to.equal(1);

			done();
		});

		it("Test with params", function(done) {

			//Create elements
			var subject = document.createElement("input");
			var spy = sinon.spy();
			var params = {"test": true, "args": [1, 3]};

			// Add properties to the input and add it to the body.
			subject.type = "text";
			document.body.appendChild(subject);

			//Add event listener on click event with params
			subject.addEventListener("click", spy);


			$.fire(subject, "click", params);

			expect(spy.callCount).to.equal(1);
			expect(spy.args[0][0]).to.be.a('Event');

			expect(spy.args[0][0]).to.have.deep.property('test');
			expect(spy.args[0][0].test).to.equal(true);

			expect(spy.args[0][0]).to.have.deep.property('args');
			expect(spy.args[0][0].args).to.be.a('array');
			expect(spy.args[0][0].args).to.deep.equal([1, 3]);

			done();
		});

	});

});
