describe("$.contents", function() {
	it("exists", function() {
		expect($.contents).to.exist;
	});

	it("adds nodes to the provided subject", function() {
		var element = document.createElement("nav");

		$.contents(element, "Test Text");
		expect(element.childNodes).to.have.length(1);

		$.contents(element, {
			tag: "li"
		});
		expect(element.childNodes).to.have.length(2);

		$.contents(element, ["3", "4"]);
		expect(element.childNodes).to.have.length(4);

		$.contents(element, [
			document.createElement("li"),
			document.createElement("li")
		]);
		expect(element.childNodes).to.have.length(6);

		$.contents(element, []);
		expect(element.childNodes).to.have.length(6);
	});

	it("can be called on elements", function() {
		var element = document.createElement("nav");

		element._.contents("Test Text");
		expect(element.childNodes).to.have.length(1);

		element._.contents({
			tag: "li"
		});
		expect(element.childNodes).to.have.length(2);

		element._.contents(["3", "4"]);
		expect(element.childNodes).to.have.length(4);

		element._.contents([
			document.createElement("li"),
			document.createElement("li")
		]);
		expect(element.childNodes).to.have.length(6);

		element._.contents([]);
		expect(element.childNodes).to.have.length(6);
	});

	it("can be called on arrays", function() {
		var list = [
			document.createElement("li"),
			document.createElement("li"),
			document.createElement("li")
		];

		list._.contents("Test Text");
		list.forEach(function(item) {
			expect(item.childNodes).to.have.length(1);
		});

		list._.contents({
			tag: "li"
		});
		list.forEach(function(item) {
			expect(item.childNodes).to.have.length(2);
		});

		list._.contents(["3", "4"]);
		list.forEach(function(item) {
			expect(item.childNodes).to.have.length(4);
		});

		list._.contents([]);
		list.forEach(function(item) {
			expect(item.childNodes).to.have.length(4);
		});
	});
});
