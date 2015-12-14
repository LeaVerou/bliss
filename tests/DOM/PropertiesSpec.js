describe('$.properties', function() {

  it('exists', function() {
    expect($.properties).to.exist;
  });

  it('sets some properties on an element', function() {

      var input = document.createElement('input');

      expect(input.disabled).to.be.false;
      expect(input.defaultChecked).to.be.false;
      expect(input.type).to.be.equal('text');
      expect(input.className).to.be.equal('');
      expect(input.value).to.be.equal('');
      expect(input.onClick).to.be.undefined;

      $.properties(input, {
        type: 'radio',
        disabled: true,
        defaultChecked: true,
        className: 'hotline-bling',
        value: 'drake',
        onClick: function() { console.log('here'); }
      });

      expect(input.disabled).to.equal(true);
      expect(input.defaultChecked).to.equal(true);
      expect(input.type).to.equal('radio');
      expect(input.className).to.equal('hotline-bling');
      expect(input.value).to.equal('drake');
      expect(input.onClick).to.be.instanceof(Function);

  });

  it('sets some properties on an element using the "_" namespace', function() {

      var input = document.createElement('input');

      expect(input.disabled).to.be.false;
      expect(input.defaultChecked).to.be.false;
      expect(input.type).to.be.equal('text');
      expect(input.className).to.be.equal('');
      expect(input.value).to.be.equal('');
      expect(input.onClick).to.be.undefined;

      input._.properties({
        type: 'radio',
        disabled: true,
        defaultChecked: true,
        className: 'hotline-bling',
        value: 'drake',
        onClick: function() { console.log('here'); }
      });

      expect(input.disabled).to.equal(true);
      expect(input.defaultChecked).to.equal(true);
      expect(input.type).to.equal('radio');
      expect(input.className).to.equal('hotline-bling');
      expect(input.value).to.equal('drake');
      expect(input.onClick).to.be.instanceof(Function);

  });

  it('sets some properties on an element using the "set" namespace', function() {

      var input = document.createElement('input');

      expect(input.disabled).to.be.false;
      expect(input.defaultChecked).to.be.false;
      expect(input.type).to.be.equal('text');
      expect(input.className).to.be.equal('');
      expect(input.value).to.be.equal('');
      expect(input.onClick).to.be.undefined;

      input._.set({ properties: {
          type: 'radio',
          disabled: true,
          defaultChecked: true,
          className: 'hotline-bling',
          value: 'drake',
          onClick: function() { console.log('here'); }
        }
      });

      expect(input.disabled).to.equal(true);
      expect(input.defaultChecked).to.equal(true);
      expect(input.type).to.equal('radio');
      expect(input.className).to.equal('hotline-bling');
      expect(input.value).to.equal('drake');
      expect(input.onClick).to.be.instanceof(Function);

  });

  it('sets some properties on an array of elements', function() {

      var arr = [
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input')
      ];

      arr.forEach(function(input) {
        expect(input.disabled).to.be.false;
        expect(input.defaultChecked).to.be.false;
        expect(input.type).to.be.equal('text');
        expect(input.className).to.be.equal('');
        expect(input.value).to.be.equal('');
        expect(input.onClick).to.be.undefined;
      });

      $.properties(arr, {
        type: 'radio',
        disabled: true,
        defaultChecked: true,
        className: 'hotline-bling',
        value: 'drake',
        onClick: function() { console.log('here'); }
      });

      arr.forEach(function(input) {
        expect(input.disabled).to.equal(true);
        expect(input.defaultChecked).to.equal(true);
        expect(input.type).to.equal('radio');
        expect(input.className).to.equal('hotline-bling');
        expect(input.value).to.equal('drake');
        expect(input.onClick).to.be.instanceof(Function);
      });

  });

  it('sets some properties on an array of elements with the "_" namespace', function() {

      var arr = [
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input')
      ];

      arr.forEach(function(input) {
        expect(input.disabled).to.be.false;
        expect(input.defaultChecked).to.be.false;
        expect(input.type).to.be.equal('text');
        expect(input.className).to.be.equal('');
        expect(input.value).to.be.equal('');
        expect(input.onClick).to.be.undefined;
      });

      arr._.properties({
        type: 'radio',
        disabled: true,
        defaultChecked: true,
        className: 'hotline-bling',
        value: 'drake',
        onClick: function() { console.log('here'); }
      });

      arr.forEach(function(input) {
        expect(input.disabled).to.equal(true);
        expect(input.defaultChecked).to.equal(true);
        expect(input.type).to.equal('radio');
        expect(input.className).to.equal('hotline-bling');
        expect(input.value).to.equal('drake');
        expect(input.onClick).to.be.instanceof(Function);
      });

  });

  it('sets some properties on an array of elements with the "set" namespace', function() {

      var arr = [
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input')
      ];

      arr.forEach(function(input) {
        expect(input.disabled).to.be.false;
        expect(input.defaultChecked).to.be.false;
        expect(input.type).to.be.equal('text');
        expect(input.className).to.be.equal('');
        expect(input.value).to.be.equal('');
        expect(input.onClick).to.be.undefined;
      });

      arr._.set({ properties: {
          type: 'radio',
          disabled: true,
          defaultChecked: true,
          className: 'hotline-bling',
          value: 'drake',
          onClick: function() { console.log('here'); }
        }
      });

      arr.forEach(function(input) {
        expect(input.disabled).to.equal(true);
        expect(input.defaultChecked).to.equal(true);
        expect(input.type).to.equal('radio');
        expect(input.className).to.equal('hotline-bling');
        expect(input.value).to.equal('drake');
        expect(input.onClick).to.be.instanceof(Function);
      });

  });

  it('allows chaining on elements', function() {

    var input = document.createElement('input');

    $.properties(input, {
      className: 'hotline-bling'
    })._.properties({
      type: 'radio'
    });

    expect(input.className).to.equal('hotline-bling');
    expect(input.type).to.equal('radio');

  });

  it('allows chaining on arrays of elements', function() {

    var arr = [
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input')
    ];

    $.properties(arr, {
      className: 'hotline-bling'
    })._.properties({
      type: 'radio'
    });

    arr.forEach(function(input) {
      expect(input.className).to.equal('hotline-bling');
      expect(input.type).to.equal('radio');
    });

  });

});
