describe('$$() API', function() {

  helpers.fixture("querySelector.html");

  it('returns a collection of one element when selecting an ID', function() {

    var elements = $$('#fixture-container');

    expect(elements).to.be.an.instanceOf(Array);
    expect(elements.length).to.be.equal(1);
    expect(elements[0].children.length).to.be.equal(2);

	});

  it('returns a collection for selecting elements with a class', function() {

    var elements = $$('.list');

    expect(elements).to.be.an.instanceOf(Array);
    expect(elements.length).to.be.equal(2);

  });

  it('returns a collection for selecting elements without a context', function() {

    var elements = $$('li');

    expect(elements).to.be.an.instanceOf(Array);
    expect(elements.length).to.be.equal(6);

  });


  it('returns a collection inside of a context', function() {

    var elements = $$('li', $('.list'));

    expect(elements).to.be.an.instanceOf(Array);
    expect(elements.length).to.be.equal(3);

  });

  it('returns a collection that can be iterated over', function() {

    var elements = $$('li');
    var count = 0;

    elements.forEach(function() {
        count += 1;
    });

    expect(count).to.be.equal(6);

  });

});
