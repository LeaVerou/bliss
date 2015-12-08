describe("Core Bliss", function () {
	"use strict";

	before(function() {
		fixture.setBase('tests/fixtures');
	});

	beforeEach(function () {
		this.fixture = fixture.load('core.html');
	});

	// testing setup
	it("has the fixture on the dom", function () {
		expect($('#fixture-container')).to.not.be.null;
	});

	it("is a valid testing environment", function () {
		// PhantomJS fails this one by default
		expect(Element.prototype.matches).to.not.be.undefined;
	});

	it("has global methods and aliases", function() {
		expect(Bliss).to.exist;
		expect($).to.exist;
		expect($$).to.exist;

		expect($).to.equal(Bliss);
		expect($$).to.equal($.$);
	});
});
