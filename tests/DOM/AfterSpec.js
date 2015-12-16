describe("$.after()", function () {

	helpers.fixture("core.html");

	it("exists", function () {
		expect($.after).to.exist;
	});

	var testContainer, para0, para1, para2;

	beforeEach(function () {
		testContainer = document.querySelector("#fixture-container .foo");

		expect(testContainer.tagName).to.equal("DIV");
		expect(testContainer.children.length).to.equal(0);

		para0 = document.createElement("p");
		para0.setAttribute("id", "para0");
		para1 = document.createElement("p");
		para1.setAttribute("id", "para1");
		para2 = document.createElement("p");
		para2.setAttribute("id", "para2");

		testContainer.appendChild(para0);
		testContainer.appendChild(para1);

		expect(testContainer.children.length).to.equal(2);
		expect(testContainer.children[0].getAttribute("id")).to.equal("para0");
		expect(testContainer.children[1].getAttribute("id")).to.equal("para1");
	});

	it("inserts an element after the subject", function () {
		$.after(para2, para0);

		expect(testContainer.children.length).to.equal(3);
		expect(testContainer.children[0].id).to.equal("para0");
		expect(testContainer.children[1].id).to.equal("para2");
		expect(testContainer.children[2].id).to.equal("para1");
	});

	it("inserts an element with '_.after()'", function () {
		para2._.after(para0);

		expect(testContainer.children.length).to.equal(3);
		expect(testContainer.children[0].id).to.equal("para0");
		expect(testContainer.children[1].id).to.equal("para2");
		expect(testContainer.children[2].id).to.equal("para1");
	});

	it("inserts an element with '_.set({ after: element })'", function () {
		para2._.set({after: para0});

		expect(testContainer.children.length).to.equal(3);
		expect(testContainer.children[0].id).to.equal("para0");
		expect(testContainer.children[1].id).to.equal("para2");
		expect(testContainer.children[2].id).to.equal("para1");
	});
});
