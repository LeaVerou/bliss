describe('$() API', function() {

  helpers.fixture("querySelector.html");

  it('returns the first element with an ID', function() {

    var element = $('#fixture-container');

    expect(element).to.be.an.instanceOf(Element);
    expect(element.tagName).to.be.equal('DIV');
    expect(element.length).to.be.undefined;
    expect(element.children.length).to.be.equal(2);

	});

  it('returns the first element with a class', function() {

    var element = $('#fixture-container .list');

    expect(element).to.be.an.instanceOf(Element);
    expect(element.tagName).to.be.equal('UL');
    expect(element.length).to.be.undefined;
    expect(element.children.length).to.be.equal(3);

    // Test the same idea using context
    element = $('li', $('.list'));

    expect(element).to.be.an.instanceOf(Element);
    expect(element.tagName).to.be.equal('LI');
    expect(element.length).to.be.undefined;

  });

  it('returns a regular element that you can use the native JS APIs on', function() {

    var element = $('li', $('.list'));

    element.setAttribute('data-drake', 'hotline bling');

    expect(element.getAttribute('data-drake')).to.equal('hotline bling');

  });

});
