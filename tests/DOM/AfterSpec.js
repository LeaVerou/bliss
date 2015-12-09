describe('$.after() API', function() {

  it('exists', function() {
		expect($.after).to.exist;
	});

  it('inserts an element after the subject', function() {

    var para1 = $.create('p', { id: 'para1', contents: 'para1' });
    var para0 = $.create('p', { id: 'para0', contents: 'para0' });
    var elements;

    $('body').appendChild(para1);

    elements = $$('p');

    expect(elements.length).to.equal(1);
    expect(elements[0].id).to.equal('para1');

    $.after(para0, para1);

    elements = $$('p');

    expect(elements.length).to.equal(2);
    expect(elements[0].id).to.equal('para1');
    expect(elements[1].id).to.equal('para0');

    // Cleanup.
    $('body').removeChild(para0);
    $('body').removeChild(para1);

  });

  it('inserts an element with "_.after()"', function() {

    var para1 = $.create('p', { id: 'para1', contents: 'para1' });
    var para0 = $.create('p', { id: 'para0', contents: 'para0' });
    var elements;

    $('body').appendChild(para1);

    elements = $$('p');

    expect(elements.length).to.equal(1);
    expect(elements[0].id).to.equal('para1');

    para0._.after(para1);

    elements = $$('p');

    expect(elements.length).to.equal(2);
    expect(elements[0].id).to.equal('para1');
    expect(elements[1].id).to.equal('para0');

    // Cleanup.
    $('body').removeChild(para0);
    $('body').removeChild(para1);

  });

  it('inserts an element with "_.set({ after: element })"', function() {

    var para1 = $.create('p', { id: 'para1', contents: 'para1' });
    var para0 = $.create('p', { id: 'para0', contents: 'para0' });
    var elements;

    $('body').appendChild(para1);

    elements = $$('p');

    expect(elements.length).to.equal(1);
    expect(elements[0].id).to.equal('para1');

    para0._.set({ after: para1 });

    elements = $$('p');

    expect(elements.length).to.equal(2);
    expect(elements[0].id).to.equal('para1');
    expect(elements[1].id).to.equal('para0');

    // Cleanup.
    $('body').removeChild(para0);
    $('body').removeChild(para1);

  });

  it('inserts an element on nested elements', function() {

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

    $.after(li2, elements[0]);

    elements = $$('li');

    expect(elements[0].textContent).to.be.equal('hello1');
    expect(elements[1].textContent).to.be.equal('hello0');

    $('body').removeChild(ul1);

  });

});
