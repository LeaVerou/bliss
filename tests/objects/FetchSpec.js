describe('$.fetch', function() {
  var server,
      data = "foo=b%20ar&baz=yolo",
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
    it("POSTs data (URLencoded string)", function () {
      return verifyResponseBody("POST", data, "foo=b ar&baz=yolo");
    });

    it("handles method type in any case", function () {
      return verifyResponseBody("post", data, "foo=b ar&baz=yolo");
    });

    it("sets provided headers", function () {
      return verifyResponseHeaders("POST", headers, headers);
    });

    it("sets Content-type header for POST if not provided", function () {
      return verifyResponseHeaders("POST", {}, {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      });
    });

    it("catch 404", function (done) {
      handleJSON("/bad", "POST", "").catch(function () {
	       done();
       });
    });
  });

  describe("GET", function () {
    it("GETs data (URLencoded string)", function () {
      return verifyResponseBody("GET", data, "foo=b ar&baz=yolo");
    });

    it("handles method type in any case", function () {
      return verifyResponseBody("get", data, "foo=b ar&baz=yolo");
    });

    it("sets provided headers", function () {
      return verifyResponseHeaders("GET", headers, headers);
    });

    it("catch 404", function (done) {
      handleJSON("/bad", "GET", "").catch(function () {
	       done();
       });
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
      expect(response.response).to.equal(encodeURI(expected));
    });
  }

  function verifyResponseHeaders(method, headers, expected) {
    var promise = handleJSON("/json", method, "", headers);
    return promise.then(function (response) {
      expect(response.responseHeaders).to.deep.equal(expected);
    });
  }
});
