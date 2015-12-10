describe("$.clone", function() {
	it("exists", function() {
		expect($.clone).to.exist;
	});

  it("clones events on element", function(done) {
    var element = document.createElement("div");
    element.addEventListener("click", function() {
      done();
    });

    var clone = $.clone(element);

    var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    clone.dispatchEvent(ev);
  });

  it("clones events on all descendants", function(done) {
    var element = document.createElement("div");
    var child = document.createElement("p");
    var grandchild = document.createElement("span");

    grandchild.addEventListener("click", function() {
      done();
    });

    child.appendChild(grandchild);
    element.appendChild(child);

    var clone = $.clone(element);

    var ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    clone.querySelector("p span").dispatchEvent(ev);
  });

});
