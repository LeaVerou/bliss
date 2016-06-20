describe("$.around", function() {
	it("exists", function() {
		expect($.around).to.exist;
	});

	it("wraps an element with the provided subject", function() {
		var outside = document.createElement("div");
		var inside = document.createElement("span");

		$.around(outside, inside);
		expect(inside.childNodes).to.have.length(0);
		expect(outside.childNodes).to.have.length(1);
		expect(outside.childNodes[0]).to.equal(inside);
	});

	it("can be called on elements", function() {
		var outside = document.createElement("div");
		var inside = document.createElement("span");

		outside._.around(inside);
		expect(inside.childNodes).to.have.length(0);
		expect(outside.childNodes).to.have.length(1);
		expect(outside.childNodes[0]).to.equal(inside);
	});

});
