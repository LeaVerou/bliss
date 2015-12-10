describe('$.inside() API', function() {

  it('exists', function() {
		expect($.inside).to.exist;
	});

  it('inserts an element after other contents', function() {

    var div1 = $.create('div', { id: 'div1' });
    var para0 = $.create('p', { id: 'para0', contents: 'para0' });
    var para1 = $.create('p', { id: 'para1', contents: 'para1' });
    var elements;

    $('body').appendChild(div1);

    elements = $$('#div1');

    expect(elements.length).to.equal(1);

    $.inside(para1, div1);

    elements = $$('#div1');

    expect(elements[0].childNodes[0].id).to.equal('para1');

    $.inside(para0, div1);

    expect(elements[0].childNodes[0].id).to.equal('para1');
    expect(elements[0].childNodes[1].id).to.equal('para0');

    // Cleanup.
    $('body').removeChild(div1);

  });

  it('inserts an element with "_.inside()" after other contents', function() {

    var div1 = $.create('div', { id: 'div1' });
    var para0 = $.create('p', { id: 'para0', contents: 'para0' });
    var para1 = $.create('p', { id: 'para1', contents: 'para1' });
    var elements;

    $('body').appendChild(div1);

    elements = $$('#div1');

    expect(elements.length).to.equal(1);

    para1._.inside(div1);

    elements = $$('#div1');

    expect(elements[0].childNodes[0].id).to.equal('para1');

    para0._.inside(div1);

    expect(elements[0].childNodes[0].id).to.equal('para1');
    expect(elements[0].childNodes[1].id).to.equal('para0');

    // Cleanup.
    $('body').removeChild(div1);

  });

  it('inserts an element with "_.set({ inside: element })" after other contents', function() {

    var div1 = $.create('div', { id: 'div1' });
    var para0 = $.create('p', { id: 'para0', contents: 'para0' });
    var para1 = $.create('p', { id: 'para1', contents: 'para1' });
    var elements;

    $('body').appendChild(div1);

    elements = $$('#div1');

    expect(elements.length).to.equal(1);

    para1._.set({ inside: div1 });

    elements = $$('#div1');

    expect(elements[0].childNodes[0].id).to.equal('para1');

    para0._.set({ inside: div1 });

    expect(elements[0].childNodes[0].id).to.equal('para1');
    expect(elements[0].childNodes[1].id).to.equal('para0');

    // Cleanup.
    $('body').removeChild(div1);

  });

  it('inserts a nested element after other nested elements', function() {

    var ul1 = $.create('ul', {
      contents: [
        {
          tag: 'li',
          contents: 'hello1'
        }
      ]
    });

    var li1 = ul1.childNodes[0];
    var li2 = $.create('li', { contents: 'hello0' });
    var elements;

    $('body').appendChild(ul1);

    elements = $$('li');

    expect(elements.length).to.equal(1);

    $.inside(li2, ul1);

    elements = $$('li');

    expect(elements[0].textContent).to.be.equal('hello1');
    expect(elements[1].textContent).to.be.equal('hello0');

    $('body').removeChild(ul1);

  });

});
