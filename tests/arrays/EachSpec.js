describe('$.each', function() {
  
  it('exists', function() {
    expect($.each).to.exist;
  });

  it('copies properties from one object to new object', function () {
    var obj = {
		prop: 1,
		func: function(){}
	  },
      result = $.each(obj, function( prop, value ){return value;});

    expect(result).to.deep.equal(obj);
  });
  
  it('copies properties and inherited properties from one object to new object', function () {
    var parent = function(){};
	parent.prototype.func = function(){};
	
	var obj = Object.create(parent.prototype);
	obj.prop = 1;
	
    result = $.each(obj, function( prop, value ){return value;});
    
	expect(result).to.deep.equal(obj);
  });  
  
  it('copies properties from one object to new object if callback context is original object', function () {
    var obj = {
		prop: 1,
		func: function(){}
	  },
      result = $.each(obj, function(prop){return this[prop];});

    expect(result).to.deep.equal(obj);
  });  

  it('copies properties from object to existing object', function () {
    var obj = {
		prop: 1,
		func: function(){}
	  },
	  existing = {
		originalProp: 2
	  },
      result = $.each(obj, function( prop, value ){return value;}, existing);

    expect(result.prop).to.equal(obj.prop);
	expect(result.func).to.equal(obj.func);
	expect(result.originalProp).to.equal(existing.originalProp);
  });
  

});