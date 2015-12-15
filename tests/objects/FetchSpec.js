describe('$.fetch', function() {
  var server;

  before(function() {
    server = sinon.fakeServer.create();
    server.respondWith("POST", "/json", function (request) {
      request.respond(200, { "Content-Type": "application/json" }, request.requestBody);
    });
  });

  after(function () {
    server.restore();
  });

  it('exists', function () {
    expect($.fetch).to.exist;
    expect(Bliss.fetch).to.exist;
  });

  it('accepts data using POST', function () {
    var data = {
      foo: "bar"
    };

    return postJSON(data).then(function (response) {
      expect(response.response).to.equal("foo=bar");
    });
  });

  function postJSON(data) {
    var then = $.fetch("/json", {
      method: "POST",
      data: data
    });

    server.respond();

    return then;
  }
});
