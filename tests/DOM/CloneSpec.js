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

});
