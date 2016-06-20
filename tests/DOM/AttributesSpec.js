describe("$.attributes", function() {
	it("exists", function() {
		expect($.attributes).to.exist;
	});

	it("sets attributes the provided subject", function() {
		var element = document.createElement("a");

		$.attributes(element, {
			href: "test"
		});
		expect(element.getAttribute("href")).to.equal("test");

		$.attributes(element, {
			id: "logo",
			class: "link",
			target: "_blank"
		});
		expect(element.getAttribute("href")).to.equal("test");
		expect(element.getAttribute("id")).to.equal("logo");
		expect(element.getAttribute("class")).to.equal("link");
		expect(element.getAttribute("target")).to.equal("_blank");
	});

	it("can be called on elements", function() {
		var element = document.createElement("a");

		element._.attributes({
			href: "test"
		});
		expect(element.getAttribute("href")).to.equal("test");

		element._.attributes({
			id: "logo",
			class: "link",
			target: "_blank"
		});
		expect(element.getAttribute("href")).to.equal("test");
		expect(element.getAttribute("id")).to.equal("logo");
		expect(element.getAttribute("class")).to.equal("link");
		expect(element.getAttribute("target")).to.equal("_blank");
	});

	it("can be called on arrays", function() {
		var elements = [
			document.createElement("a"),
			document.createElement("a"),
			document.createElement("a")
		];

		elements._.attributes({
			href: "test"
		});
		elements.forEach(function(element) {
			expect(element.getAttribute("href")).to.equal("test");
		});

		elements._.attributes({
			id: "logo",
			class: "link",
			target: "_blank"
		});
		elements.forEach(function(element) {
			expect(element.getAttribute("href")).to.equal("test");
			expect(element.getAttribute("id")).to.equal("logo");
			expect(element.getAttribute("class")).to.equal("link");
			expect(element.getAttribute("target")).to.equal("_blank");
		});
	});
});
