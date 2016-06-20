describe("$.extend", function() {

	var child, parent;

	beforeEach(function() {
		child = {
			id: 30,
			name: "Jim",
			hobby: "Biking",
			food: "pizza"
		};
		parent = {
			id: 45,
			name: "Fred",
			location: "USA",
			hobby: "Fishing",
			food: "pasta"
		};
	        orgChild = {
				id: 30,
				name: "Jim",
				hobby: "Biking",
				food: "pizza"
			};
	});

	it("copies properties from parent to child", function() {
		$.extend(child, parent);
		expect(child.name).to.equal(parent.name);

		for (var key in parent) {
			expect(child[key]).to.not.be.null;
		}
	});

	it("returns the result as well as the object passed", function() {
		var result = $.extend(child, parent);
		expect(result).to.deep.equal(child);
	});

	it("takes an array of white list properties", function() {
		$.extend(child, parent, ["hobby", "food"]);
		
		expect(child.hobby).to.equal(parent.hobby);
		expect(child.food).to.equal(parent.food);
		expect(child.name).to.equal(orgChild.name);
		expect(child.food).to.not.equal(orgChild.food);
	});

	it('takes the string "own" to reserve own properties', function() {
	        var newParent = Object.create(parent);
	        newParent.ownProperty = "Only property that should be added to child";
	        $.extend(child, newParent, "own");
	
	        expect(child.food).to.not.equal(newParent.food);
	        expect(child.hobby).to.equal(orgChild.hobby);
	        expect(child.ownProperty).to.equal(newParent.ownProperty);
	});

	it("takes a function to filter the properties", function() {
		$.extend(child, parent, function(prop) {
			return prop == "id";
		});

		expect(child.name).to.equal(orgChild.name);
		expect(child.location).to.be.undefined;
		expect(parent.id).to.equal(child.id);
		expect(child.id).to.not.equal(orgChild.id);
	});

	it("takes a regular expression for white listing the properties", function() {
		$.extend(child, parent, /^name|^hobby$/);

		expect(child.name).to.equal(parent.name);
		expect(child.name).to.not.equal(orgChild.name);
		expect(child.hobby).to.equal(parent.hobby);
		expect(child.id).to.equal(orgChild.id);
		expect(child.location).to.be.undefined;
	});


});
