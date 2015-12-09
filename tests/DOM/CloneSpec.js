describe("$.clone", function() {
	it("exists", function() {
		expect($.clone).to.exist;
	});

	it("clones the node and all attributes", function() {
	    var element = $.create("div", { id: "element", class: "test",  contents: "This is the element" });
      element.setAttribute("title", "the element");
      element._.style({"color": "green"});
	    var clone = $.clone(element);

		expect(clone.textContent).to.equal("This is the element");
    expect(clone.id).to.equal("element");
    expect(clone.title).to.equal("the element");
    expect(clone.className).to.equal("test");
    expect(clone.style.color).to.equal("green");
	});

  it("clones the node and all children", function() {
	    var element = $.create("div", { class: "parent",  contents: "This is the parent" });
      var child = $.create("p", {contents: "This is the child"});
      var grandchild = $.create("span", {class: "grandchild", contents: "This is the grandchild"});

      child.appendChild(grandchild);
      element.appendChild(child);

      grandchild._.set({
        "style": {
          "color": "blue"
        }
      });
	    var clone = $.clone(element);

		expect(clone.childNodes).to.have.length(2);
    expect(clone.childNodes[1].childNodes).to.have.length(2);
    expect(clone.childNodes[1].childNodes[1].style.color).to.equal("blue");
	});


/*
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

		var newElement1 = document.createElement("li");
		var newElement2 = document.createElement("li");
		element._.contents([
			newElement1,
			newElement2
		]);
		expect(element.childNodes).to.have.length(6);
		expect(element.childNodes[4]).to.equal(newElement1);
		expect(element.childNodes[5]).to.equal(newElement2);

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
	});*/
});
