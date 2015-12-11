describe('$.extend', function() {

	var child, parent;

	beforeEach(function() {
		child = {
			id: 30,
			name: 'Jim',
			hobby: 'Biking',
			food: 'pizza'
		};
		parent = {
			id: 45,
			name: 'Fred',
			location: 'USA',
			hobby: 'Fishing',
			food: 'pasta'
		};
	});

	it('copies properties from parent to child', function() {
		$.extend(child, parent);
		expect(child.name).to.equal(parent.name);

		for(var key in parent) {
			expect(child[key]).to.not.be.null;
		}
	});

	it('returns the result as well as the object passed', function() {
		var result = $.extend(child, parent);
		expect(result).to.deep.equal(child);
	});

	it('takes an array of white list properties', function() {
		var orgChild = child;
		$.extend(child, parent, ['hobby', 'food']);
		
		expect(child.hobby).to.equal(parent.hobby);
		expect(child.food).to.equal(parent.food);

		expect(child.name).to.equal(orgChild.name);
		expect(child.name).to.equal(orgChild.name);
	});

	it('takes the string "own" to reserve own properties', function() {
		var orgChild = child;
		$.extend(child, parent, "own");
		
		for(var prop in orgChild) {
			expect(child[prop]).to.equal(orgChild[prop]);
		}

		expect(child.location).to.equal(parent.location);
	});

	it('takes a function to filter the properties', function() {
		var orgChild = child;
		$.extend(child, parent, function(prop) {
			return prop == 'id';
		});

		expect(child.name).to.equal(orgChild.name);
		expect(child.location).to.be.undefined;
		expect(parent.id).to.equal(child.id);
	});

	it('takes a regular expression for white listing the properties', function() {
		var orgChild = child;
		$.extend(child, parent, /^name|^hobby$/);

		expect(child.name).to.equal(parent.name);
		expect(child.hobby).to.equal(parent.hobby);
		expect(child.id).to.equal(orgChild.id);
		expect(child.location).to.be.undefined;
	});


});