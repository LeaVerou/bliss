/**
 * Simple HTML transformations, in HTML!
 * Author: Lea Verou
 */
(function($, $$){

var actions = ["before", "after", "start", "end", "around", "attr"];
var methods = {"end": "inside"}

actions.forEach(function(action){
	var method = methods[action] || action;

	$$("template[data-" + action + "]").forEach(function(template){
		var context = template.parentNode;
		var selector = template.getAttribute("data-" + action);
		
		$$(selector, context).forEach(function(element){
			var clone = document.importNode(template.content, true);

			if (method == "around") {
				var content = $$("content", clone);

				if (content.length > 0) {
					$.before(clone, element);
					// TODO handle multiple <content> and <content select>
					$.before(element, content[0]);
					$.remove(content[0]);

					return;
				}
			}
			else if (method == "attr") {
				var content = $$("content", clone);

				if (content.length > 0) {
					console.log(content[0]);
					$$(content[0].attributes).forEach(function(attribute){
						if (attribute.name != "select") {
							element.setAttribute(attribute.name, attribute.value);
						}
					});
				}

				return;
			}
			
			$[method](clone, element);	
		});
	});
});

})(Bliss, Bliss.$);