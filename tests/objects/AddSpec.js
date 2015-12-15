describe("$.add", function () {
  before(function() {
    fixture.setBase('tests/fixtures');
  });

  beforeEach(function () {
    this.fixture = fixture.load('core.html');
  });

  it("exists", function () {
    expect($.add).to.be.ok;
  });

  it("adds a given function to $, Element and Array", function () {
    $.add("foo", function () {});

    expect([1,2,3]._.foo).to.be.ok;
    expect($(".foo")._.foo).to.be.ok;
    expect($.foo).to.be.ok;
  });

  it("does not add a given function to Array", function () {
    $.add("bar", function () {}, {
      array: false
    });

    expect([1,2,3]._.bar).to.not.be.ok;

    expect($(".foo")._.bar).to.be.ok;
    expect($.bar).to.be.ok;
  });

  it("accepts multiple functions", function () {
    var methods = {
        baz: function () {},
        baz2: function () {}
    };

    $.add(methods, {
      element: false
    });

    ["baz", "baz2"].forEach(function (method) {
      expect([1,2,3]._[method]).to.be.ok;
      expect($(".foo")._[method]).to.not.be.ok;
      expect($[method]).to.be.ok;
    });
  });

});
