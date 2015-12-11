describe("$.create", function() {
	it("creates an element and sets properties on it", function() {
		var element = $.create("article", {
			className: "wide"
		});

		expect(element).to.be.an.instanceOf(Element);
		expect(element.className).to.be.equal("wide");
		expect(element.tagName).to.be.equal("ARTICLE");
	});

	it("equivalent to document.createElement() when called with only a string", function() {
		var p = $.create("p");

		expect(p).to.be.an.instanceOf(HTMLElement);
		expect(p.nodeType).to.equal(1);
		expect(p.nodeName).to.equal("P");
	});

	describe("passed only an object", function() {
		it("creates an element and sets the properties on it", function() {
			var element = $.create({ tag: "span" });

			expect(element).to.be.an.instanceOf(Element);
			expect(element.tagName).to.be.equal("SPAN");
		});

		it("creates a div by default", function() {
			var element = $.create({});

			expect(element.tagName).to.be.equal("DIV");
		});
	});

	it("creates a div when there are no arguments", function() {
		var element = $.create();

		expect(element.tagName).to.be.equal("DIV");
	});
});
