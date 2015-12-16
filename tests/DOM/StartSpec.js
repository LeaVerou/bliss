describe("$.start()", function () {

	helpers.fixture("core.html");

	it("exists", function () {
		expect($.start).to.exist;
	});

	var testContainer, para;

	beforeEach(function () {
		testContainer = document.getElementById("fixture-container");
		
		para = document.createElement("p");
		para.setAttribute("id", "para");
	});

	it("inserts an element before existing content", function () {
		$.start(para, testContainer);
		expect(testContainer.children.length).to.equal(2);
		expect(testContainer.children[0].id).to.equal("para");
	});

	it("inserts an element before existing content [using ._.]", function () {
		para._.start(testContainer);
		expect(testContainer.children.length).to.equal(2);
		expect(testContainer.children[0].id).to.equal("para");
	});

	it("inserts an element before existing content [using set]", function () {
		para._.set({start: testContainer});
		expect(testContainer.children.length).to.equal(2);
		expect(testContainer.children[0].id).to.equal("para");
	});

});
