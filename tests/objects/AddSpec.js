describe("$.add", function () {
  before(function() {
		fixture.setBase('tests/fixtures');
	});

	beforeEach(function () {
		this.fixture = fixture.load('core.html');
	});

  it("exists", function () {
    expect($.add).to.exist;
  });

  describe("Define functions", function () {
    it("adds a given function to $, Element and Array", function () {
      $.add("foo", function () {});

      expect([1,2,3]._.foo).to.exist;
      expect($(".foo")._.foo).to.exist;
      expect($.foo).to.exist;
    });

    it("currently skips 'on' object when using method name as first argument", function () {
      $.add("bar", function () {}, {
        array: false
      });

      expect([1,2,3]._.bar).to.exist;
      expect($(".foo")._.bar).to.exist;
      expect($.bar).to.exist;
    });

    it("accepts multiple functions by passing an object", function () {
      var methods = {
          baz: function () {},
          baz2: function () {}
      };

      $.add(methods);

      ["baz", "baz2"].forEach(function (method) {
        expect([1,2,3]._[method]).to.exist;
        expect($(".foo")._[method]).to.exist;
        expect($[method]).to.exist;
      });
    });

    it("hides functions from Element, Array and $ when told", function () {
      var methods = {
          none: function () {},
          none2: function () {}
      };

      $.add(methods, {
        element: false,
        array: false,
        $: false
      });

      ["none", "none2"].forEach(function (method) {
        expect([1,2,3]._[method]).to.not.exist;
        expect($(".foo")._[method]).to.not.exist;
        expect($[method]).to.not.exist;
      });
    });

    it("overwrites functions by default", function () {
      var spy = sinon.spy();

      $.add("overwrite", spy);
      $.overwrite([1]);
      $.add("overwrite", function () {});
      $.overwrite([1]);

      expect(spy.callCount).to.equal(1);
    });

    it("refuses to overwrite functions when told", function () {
      var spy = sinon.spy();

      $.add("overwrite", spy);
      $.overwrite([1]);
      $.add({overwrite: function () {}}, null, true);
      $.overwrite([1]);

      expect(spy.callCount).to.equal(2);
    });
  });

  describe("Calling functions", function () {
    it("calls the function for each element in a Array", function () {
      var spy = sinon.spy();

      $.add("run", spy);
      [1,2,3]._.run();

      expect(spy.callCount).to.equal(3);

      $.run([1,2,3,4]);

      expect(spy.callCount).to.equal(7);
    });

    it("calls the function once when given a single Element", function () {
      var spy = sinon.spy();

      $.add("run", spy);
      $(".foo")._.run();

      expect(spy.callCount).to.equal(1);

      $.run($(".foo"));

      expect(spy.callCount).to.equal(2);
    });
  });
});
