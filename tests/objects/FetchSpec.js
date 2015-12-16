describe('$.fetch', function() {
  var server,
      dataObj = { foo: "bar" },
      dataStr = "foo=b%20ar&baz=yolo",
      headers = {foo: "bar", "Content-type": "yadda;charset=utf-8"};

  before(function() {
    server = sinon.fakeServer.create();
    server.respondWith("POST", "/json", function (request) {
      request.respond(200, request.requestHeaders, request.requestBody);
    });

    server.respondWith("GET", /\/json\??(.*)/, function (request, query) {
      request.respond(200, request.requestHeaders, query);
    });
  });

  after(function () {
    server.restore();
  });

  it('exists', function () {
    expect($.fetch).to.exist;
    expect(Bliss.fetch).to.exist;
  });

  describe("POST", function () {
    it('POSTs data (Object)', function () {
      return verifyResponseBody("POST", dataObj, "foo=bar");
    });

    it("POSTs data (URLencoded string)", function () {
      return verifyResponseBody("POST", dataStr, encodeURI("foo=b ar&baz=yolo"));
    });

    it("handles method type in any case", function () {
      return verifyResponseBody("post", dataObj, "foo=bar");
    });

    it("sets provided headers", function () {
      return verifyResponseHeaders("POST", headers, headers);
    });

    it("sets Content-type header for POST if not provided", function () {
      return verifyResponseHeaders("POST", {}, {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      });
    });
  });

  describe("GET", function () {
    it('GETs data (Object)', function () {
      return verifyResponseBody("GET", dataObj, "foo=bar");
    });

    it("GETs data (URLencoded string)", function () {
      return verifyResponseBody("GET", dataStr, encodeURI("foo=b ar&baz=yolo"));
    });

    it("handles method type in any case", function () {
      return verifyResponseBody("get", dataObj, "foo=bar");
    });

    it("sets provided headers", function () {
      return verifyResponseHeaders("GET", headers, headers);
    });
  });

  function handleJSON(url, method, data, headers) {
    var then = $.fetch(url, {
      method: method,
      data: data,
      headers: headers || {}
    });

    server.respond();

    return then;
  }

  function verifyResponseBody(method, data, expected) {
    var promise = handleJSON("/json", method, data);
    return promise.then(function (response) {
      expect(response.response).to.equal(expected);
    });
  }

  function verifyResponseHeaders(method, headers, expected) {
    var promise = handleJSON("/json", method, {}, headers);
    return promise.then(function (response) {
      expect(response.responseHeaders).to.deep.equal(expected);
    });
  }
});
