describe("$.hooks", function () {

  it("exists", function () {
    expect($.hooks).to.exist;
    expect($.hooks.add).to.exist;
    expect($.hooks.run).to.exist;
  });

  it("adds a hook by providing a name and callback", function () {
    var spy = sinon.spy();

    $.hooks.add("hook1", spy);
    $.hooks.run("hook1");

    expect(spy.callCount).to.equal(1);
  });

  it("provides an environment variable while running a hook", function (done) {
    var foo = {
      foo: "bar"
    };

    $.hooks.add("hook2", function (env) {
      expect(env).to.deep.equal(foo);
      done();
    });

    $.hooks.run("hook2", foo);
  });
});
