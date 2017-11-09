describe("$.delegate", function() {

	helpers.fixture("events.html");

	describe("$.delegate in subject-type-selector-callback form", function() {

		it("adds events to the children of the subject", function(done) {
			var subject = document.querySelector("#divContainer");
			var inner = subject.querySelector("a");

			$.delegate(subject, "click", "a", function() {
				done();
			});
			helpers.click(inner);
		});

		it("can be called on elements", function(done) {
			var subject = document.querySelector("#divContainer");
			var inner = subject.querySelector("a");

			subject._.delegate("click", "a", function() {
				done();
			});
			helpers.click(inner);
		});

		it("can be called on arrays", function() {
			var subjects = Array.from(document.querySelectorAll(".array"));
			var inners = Array.from(document.querySelectorAll(".array a"));

			var callbackSpy = sinon.spy(function() {
				var expectedSubject = subjects[callbackSpy.callCount - 1];
				expect(this).to.equal(expectedSubject);
			});
			subjects._.delegate("click", "a", callbackSpy);
			subjects.forEach(helpers.click); // shouldn't trigger callbacks

			inners.forEach(helpers.click);   // should trigger callbacks
			expect(callbackSpy.calledThrice).to.be.ok;
		});
	});

	describe("$.delegate in subject-type-selectorsToCallbacks form", function() {

		it("adds events to the children of the subject", function() {
			var subject = document.querySelector("#divContainer");
			var inners = Array.from(subject.children);

			var spy = sinon.spy(function(i, target) {
				expect(i).to.equal(spy.callCount);
				expect(target).to.equal(subject);
			});

			$.delegate(subject, "click", {
				"a": function() {
					spy(1, this);
				},
				"span": function() {
					spy(2, this);
				},
				"img": function() {
					spy(3, this);
				}
			});

			inners.forEach(helpers.click);
			expect(spy.calledThrice).to.be.ok;
		});

		it("can be called on elements", function() {
			var subject = document.querySelector("#divContainer");
			var inners = Array.from(subject.children);

			var spy = sinon.spy(function(i, target) {
				expect(i).to.equal(spy.callCount);
				expect(target).to.equal(subject);
			});

			subject._.delegate("click", {
				"a": function() {
					spy(1, this);
				},
				"span": function() {
					spy(2, this);
				},
				"img": function() {
					spy(3, this);
				}
			});

			inners.forEach(helpers.click);
			expect(spy.calledThrice).to.be.ok;
		});

		it("can be called on arrays", function() {
			var subject = document.querySelector("#divContainer");
			var inners = Array.from(subject.children);

			var spy = sinon.spy(function(i, target) {
				expect(i).to.equal(spy.callCount);
				expect(target).to.equal(subject);
			});

			// TODO: Make less trivial (multiple subjects)
			[subject]._.delegate("click", {
				"a": function() {
					spy(1, this);
				},
				"span": function() {
					spy(2, this);
				},
				"img": function() {
					spy(3, this);
				}
			});

			inners.forEach(helpers.click);
			expect(spy.calledThrice).to.be.ok;
		});
	});

	describe("$.delegate in subject-typesToSelectorsToCallbacks form", function() {
		it("adds events to the children of the subject", function() {
			var subject = document.querySelector("#divContainer");
			var inners = Array.from(subject.children);

			var mouseDownSpy = sinon.spy(function(i, target) {
				expect(i).to.equal(mouseDownSpy.callCount);
				expect(target).to.equal(subject);
			});
			var mouseUpSpy = sinon.spy(function(i, target) {
				expect(i).to.equal(mouseUpSpy.callCount);
				expect(target).to.equal(subject);
			});

			$.delegate(subject, {
				"mousedown": {
					"a": function() {
						mouseDownSpy(1, this);
					},
					"span": function() {
						mouseDownSpy(2, this);
					},
					"img": function() {
						mouseDownSpy(3, this);
					}
				},
				"mouseup": {
					"a": function() {
						mouseUpSpy(1, this);
					},
					"span": function() {
						mouseUpSpy(2, this);
					},
					"img": function() {
						mouseUpSpy(3, this);
					}
				}
			});

			inners.forEach(helpers.mouseDown);
			expect(mouseDownSpy.calledThrice).to.be.ok;

			inners.forEach(helpers.mouseUp);
			expect(mouseUpSpy.calledThrice).to.be.ok;
		});
	});
});
