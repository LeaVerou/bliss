describe("$.value", function() {

	it("exists", function () {
		expect($.value).to.exist;
	});

	it("not throw", function() {
		expect($.value).not.to.throw(Error);
	});

	it("returns null if object is null", function() {
		var obj = null;
		expect($.value(obj)).to.be.null;
	});

	it("returns undefined if property not defined", function() {
		var obj = {};
		expect($.value(obj, "bar")).to.be.undefined;
	});

	it("returns value if property is defined", function() {
		var obj = {
			foo:1,
			bar:{
				bar1:"one"
			}
		};
		expect($.value(obj, "foo")).to.equal(1);
		expect($.value(obj, "bar", "bar1")).to.equal("one");
	});

	it("works correctly with Symbol properties", function() {
		var foo = Symbol("foo");
		var bar = Symbol("bar");
		var obj = {
			[foo]: 1
		};

		expect($.value(obj, foo)).to.equal(1);
		expect($.value(obj, bar)).to.be.undefined;
	});

	it("works correctly for String objects", function() {
		var obj = new String("obj");
		obj.foo = 1;

		expect($.value(obj, "foo")).to.equal(1);
	});
});
