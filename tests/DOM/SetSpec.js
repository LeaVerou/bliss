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
});
