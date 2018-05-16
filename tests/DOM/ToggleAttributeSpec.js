describe("$.toggleAttribute", function() {
	it("exists", function() {
		expect($.toggleAttribute).to.exist;
	});

	it("sets and removes attributes the provided subject", function() {
		var element = document.createElement("a");

		$.toggleAttribute(element, "href", "test", true);
		expect(element.getAttribute("href")).to.equal("test");

		$.toggleAttribute(element, "href", "test", false);
		expect(element.getAttribute("href")).to.equal(null);

		$.toggleAttribute(element, "href", "test");
		expect(element.getAttribute("href")).to.equal("test");

		$.toggleAttribute(element, "href", null);
		expect(element.getAttribute("href")).to.equal(null);
	});

	it("can be called on elements", function() {
		var element = document.createElement("a");

		element._.toggleAttribute("href", "test", true);
		expect(element.getAttribute("href")).to.equal("test");

		element._.toggleAttribute("href", "test", false);
		expect(element.getAttribute("href")).to.equal(null);

		element._.toggleAttribute("href", "test");
		expect(element.getAttribute("href")).to.equal("test");

		element._.toggleAttribute("href", null);
		expect(element.getAttribute("href")).to.equal(null);
	});

	it("can be called on arrays", function() {
		var elements = [
			document.createElement("a"),
			document.createElement("a"),
			document.createElement("a")
		];

		elements._.toggleAttribute("href", "test", true);
		elements.forEach(function(element) {
			expect(element.getAttribute("href")).to.equal("test");
		});
	});
});
