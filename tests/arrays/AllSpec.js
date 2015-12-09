describe('$.all', function() {
  
  it('exists', function() {
    expect($.all).to.exist;
    expect([]._.all).to.exist;
  });

  it('returns the value of the method for each item in the array', function () {
    var arr = ["Foo", "bar"],
      result = $.all(arr, "toUpperCase");

    expect(result[0]).to.equal('FOO');
    expect(result[1]).to.equal('BAR');
    expect(result).to.deep.equal(arr._.all('toUpperCase'));
  });

  it('returns the original array if method returns nothing', function() {
    var Obj = function () {
        this.method = function () {};
        return this;
      }, arr = [new Obj(), new Obj(), new Obj()],
      result = $.all(arr, 'method');

    expect(result).to.deep.equal(arr);
  });

  describe('the method invoked by $.all', function() {
    var Obj, arr;

    beforeEach(function () {
      Obj = function() {
        this.method = sinon.spy();
        return this;
      },
      arr = [new Obj(), new Obj(), new Obj()];
    });

    it('calls once for each item in the array', function() {
      var result = $.all(arr, 'method');
      expect(result.length).to.equal(3);

      arr.forEach(function (item) {
        expect(item.method.calledOnce).to.be.true;
      });

      expect(result).to.deep.equal(arr._.all('method'));
    });

    it('can take single params', function() {
      var result = $.all(arr, 'method', 'foo');
      arr.forEach(function (item) {
        expect(item.method.calledWith('foo')).to.be.true;
      });
    });

    it("can accept multiple params", function() {
      var result = $.all(arr, 'method', ['foo', 'bar']);
      arr.forEach(function (item) {
        expect(item.method.calledWith(['foo', 'bar'])).to.be.true;
      });
    });
  });

});