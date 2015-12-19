describe("Core Bliss", function () {
	"use strict";

	helpers.fixture("core.html");

	// testing setup
	it("has the fixture on the dom", function () {
		expect($('#fixture-container')).to.not.be.null;
	});

	it("has global methods and aliases", function() {
		expect(Bliss).to.exist;
		expect($).to.exist;
		expect($$).to.exist;

		expect($).to.equal(Bliss);
		expect($$).to.equal($.$);
	});
});
