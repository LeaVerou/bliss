describe("$.set", function() {

	var el;
	helpers.fixture('set.html');

	beforeEach(function() {
		el = document.querySelector('#fixture-container');
	});

	it("exists", function() {
		expect($.set).to.exist;
		expect(el._.set).to.exist;
	});

	it("sets options on the provided subject", function() {
		$.set(el, {
			style: {
				color: "red"
			}
		});

		expect(el).to.exist;
		expect(el.style.color).to.equal("red");
	});

	it('returns the element from set', function() {
		var result = el._.set({color: 'red'});
		expect(el).to.deep.equal(result);
	});

	it("can be called on els", function() {
		el._.set({className: "main-navigation"});
		expect(el.className).to.equal("main-navigation");
	});

	it("can be called on arrays", function() {
		var list = helpers.nodesToArray(el.querySelectorAll("li"));

		list._.set({className: "list-part"});

		list.forEach(function(item) {
			expect(item.className).to.equal("list-part");
		});
	});

	it("can take string as key and val", function() {
		el._.set('className', 'foo');
		expect(el.className).to.deep.equal('foo');
	});

	it("sets other options as properties or attributes on the subject", function() {
		var input = document.querySelector('input');
		$.set(input, {
			id: "the-main-one",
			type: "text",
			disabled: true
		});

		expect(input.id).to.equal("the-main-one");
		expect(input.disabled).to.be.true;
		expect(input.type).to.equal("text");
	});
});
