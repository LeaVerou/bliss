describe("$.delegate", function() {
	describe("$.delegate in subject-type-selector-callback form", function() {
		it("adds events to the children of the subject", function(done) {
			var subject = document.createElement("div");
			document.body.appendChild(subject);

			var inner = document.createElement("a");
			subject.appendChild(inner);

			$.delegate(subject, "click", "a", function() {
				done();
			});
			helpers.click(inner);
		});

		it("can be called on elements", function(done) {
			var subject = document.createElement("div");
			document.body.appendChild(subject);

			var inner = document.createElement("a");
			subject.appendChild(inner);

			subject._.delegate("click", "a", function() {
				done();
			});
			helpers.click(inner);
		});

		it("can be called on arrays", function() {
			var subjects = [
				document.createElement("div"), // div 1
				document.createElement("div"), // div 2
				document.createElement("div")  // div 3
			];
			var inners = [
				document.createElement("a"), // goes inside div 1
				document.createElement("a"), // goes inside div 2
				document.createElement("a")  // goes inside div 3
			];
			subjects.forEach(function(subject, index) {
				document.body.appendChild(subject);
				subject.appendChild(inners[index]);
			});

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
			var subject = document.createElement("div");
			document.body.appendChild(subject);

			var inners = [
				document.createElement("a"),
				document.createElement("span"),
				document.createElement("img"),
			];
			inners.forEach(function(inner) {
				subject.appendChild(inner);
			});

			var spy = sinon.spy(function(i, target) {
				expect(i).to.equal(spy.callCount);
				expect(target).to.equal(subject);
			});

			$.delegate(subject, "click", {
				"a": function() { spy(1, this); },
				"span": function() { spy(2, this); },
				"img": function() { spy(3, this); }
			});
			inners.forEach(helpers.click);
			expect(spy.calledThrice).to.be.ok;
		});

		it("can be called on elements", function() {
			var subject = document.createElement("div");
			document.body.appendChild(subject);

			var inners = [
				document.createElement("a"),
				document.createElement("span"),
				document.createElement("img"),
			];
			inners.forEach(function(inner) {
				subject.appendChild(inner);
			});

			var spy = sinon.spy(function(i, target) {
				expect(i).to.equal(spy.callCount);
				expect(target).to.equal(subject);
			});

			subject._.delegate("click", {
				"a": function() { spy(1, this); },
				"span": function() { spy(2, this); },
				"img": function() { spy(3, this); }
			});
			inners.forEach(helpers.click);
			expect(spy.calledThrice).to.be.ok;
		});

		it("can be called on arrays", function() {
			var subject = document.createElement("div");
			document.body.appendChild(subject);

			var inners = [
				document.createElement("a"),
				document.createElement("span"),
				document.createElement("img"),
			];
			inners.forEach(function(inner) {
				subject.appendChild(inner);
			});

			var spy = sinon.spy(function(i, target) {
				expect(i).to.equal(spy.callCount);
				expect(target).to.equal(subject);
			});

			// TODO: Make less trivial (multiple subjects)
			[subject]._.delegate("click", {
				"a": function() { spy(1, this); },
				"span": function() { spy(2, this); },
				"img": function() { spy(3, this); }
			});
			inners.forEach(helpers.click);
			expect(spy.calledThrice).to.be.ok;
		});
	});

	describe("$.delegate in subject-typesToSelectorsToCallbacks form", function() {
		it("adds events to the children of the subject", function() {
			var subject = document.createElement("div");
			document.body.appendChild(subject);

			var inners = [
				document.createElement("a"),
				document.createElement("span"),
				document.createElement("img"),
			];
			inners.forEach(function(inner) {
				subject.appendChild(inner);
			});

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
					"a": function() { mouseDownSpy(1, this); },
					"span": function() { mouseDownSpy(2, this); },
					"img": function() { mouseDownSpy(3, this); }
				},
				"mouseup": {
					"a": function() { mouseUpSpy(1, this); },
					"span": function() { mouseUpSpy(2, this); },
					"img": function() { mouseUpSpy(3, this); }
				}
			});

			inners.forEach(helpers.mouseDown);
			expect(mouseDownSpy.calledThrice).to.be.ok;
			inners.forEach(helpers.mouseUp);
			expect(mouseUpSpy.calledThrice).to.be.ok;
		});
	});
});
