// Add ids to all functions
$$("#docs article > h1").forEach(function(h1) {
	var article = h1.parentNode;

	if (article && !article.id) {
		article.id = "function-" + h1.firstChild.textContent.trim().replace(/^\$\.|\(\)$/g, "");
	}
});

// Add ids to all other sections
$$("section h1").forEach(function(h1) {
	var section = h1.closest("section, article");

	if (section && !section.id) {
		section.id = h1.textContent.replace(/\s+/g, "-").replace(/[^\w-]/g, "");
	}
});

if (/\/docs\.html$/.test(location.pathname)) {
	// Table of Contents
	var tocList = $("#toc ol");

	$$("body > section > h1").forEach(function(h1) {
		var section = h1.parentNode;

		function toLi(h1) {
			return $.create("li", {
				contents: {
					"tag": "a",
					"href": "#" + h1.parentNode.id,
					"textContent": h1.firstChild.textContent
				}
			});
		}

		var li = toLi(h1);

		var subheadings = $$("body > section section h1, body > section article h1", section);

		if (subheadings.length) {
			$.create("ol", {
				contents: subheadings.map(toLi),
				inside: li
			});
		}

		tocList.appendChild(li);
	});

	
	$$("a.jq").forEach(function(a){
		if (!a.href) {
			var content = a.textContent;
			var url = "http://api.jquery.com/";
			console.log(content);
			var fn = content.match(/jQuery(?:\.fn)?\.([a-z]+)/i)[1];

			if (content.indexOf('jQuery.fn') === -1) {
				url += "jQuery"
			}

			a.href = url + fn;
		}

		a.texContent += "()";
	})
}

// TODO Find references to Bliss functions and make them links to the docs