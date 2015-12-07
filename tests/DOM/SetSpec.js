describe("$.set", function() {
	it("exists", function() {
		expect($.set).to.exist;
	});

	it("sets options on the provided subject", function() {
		var element = $.set(document.createElement("nav"), {
			style: {
				color: "red"
			}
		});

		expect(element).to.exist;
		expect(element.style.color).to.equal("red");
	});

	it("can be called on elements", function() {
		var element = document.createElement("nav");
		element._.set({className: "main-navigation"});

		expect(element.className).to.equal("main-navigation");
	});

	it("can be called on arrays", function() {
		var list = [
			document.createElement("li"),
			document.createElement("li"),
			document.createElement("li")
		];

		list._.set({className: "list-part"});

		list.forEach(function(item) {
			expect(item.className).to.equal("list-part");
		});
	});

	it("sets other options as properties or attributes on the subject", function() {
		var element = $.set(document.createElement("input"), {
			id: "the-main-one",
			type: "text",
			disabled: true
		});

		expect(element.id).to.equal("the-main-one");
		expect(element.disabled).to.be.true;
		expect(element.type).to.equal("text");
	});
});
