describe("Core Bliss", function () {
	"use strict";

	beforeEach(function () {
		fixture.setBase('tests/fixtures');
		this.fixture = fixture.load('core.html');
		document.body.innerHTML += this.fixture[0];
	});

	// testing setup
	it("has the fixture on the dom", function () {
		expect($('#fixture-container')).to.not.be.null;
	});

	it("has global methods and aliases", function() {
		expect(Bliss).to.be.defined;
		expect($).to.be.defined;
		expect($$).to.be.defined;

		expect($).to.equal(Bliss);
		expect($$).to.equal($.$);
	});
});
