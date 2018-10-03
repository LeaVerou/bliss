describe("$.when", function() {

	helpers.fixture("core.html");

	var spy;

	beforeEach(function() {
		spy = sinon.spy();
	});

	it("resolves when event is fired", async function () {
		$.when(document.body, "click").then(spy);

		helpers.click(document);
		helpers.click(document);

		requestAnimationFrame(() => {
			expect(spy.callCount).to.equal(1);
			done();
		});
	});

	it("can be called on elements", function () {
		document._.when("click").then(spy);
		helpers.click(document);
		helpers.click(document);

		requestAnimationFrame(() => {
			expect(spy.callCount).to.equal(1);
			done();
		});
	});

	it("resolves when test passes", function () {
		$.when(document, "keyup", evt => evt.key === "Escape").then(spy);
		document.dispatchEvent(new KeyboardEvent("keyup", {key: "Escape"}));

		requestAnimationFrame(() => {
			expect(spy.callCount).to.equal(1);
			done();
		});
	});

	it("only resolves when test passes", function () {
		$.when(document, "keyup", evt => evt.key === "Escape").then(spy);
		helpers.keyup(document, {key: "A"});

		requestAnimationFrame(() => {
			expect(spy.callCount).to.equal(0);
			done();
		});
	});
});
