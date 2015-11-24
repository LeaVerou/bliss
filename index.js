// Add ids and implementation to all functions
$$("#docs article > h1").forEach(function(h1) {
	var article = h1.parentNode;

	h1.firstChild.textContent = h1.firstChild.textContent.trim();
	
	var fn = h1.firstChild.textContent.replace(/^\$\.|\(\)$/g, "");

	if (article && !article.id) {
		article.id = "fn-" + fn;
	}

	$.create("a", {
		href: "#" + article.id,
		around: h1.firstChild
	});

	article._.contents({
		tag: "button",
		textContent: "Show implementation",
		className: "implementation",
		onclick: function(){
			var pre = this.nextElementSibling;

			if (!pre || !pre.matches("pre")) {
				pre = document.createElement("pre")._.after(this);

				var source = ($.sources[fn] || $[fn]) + "";
				source = source.replace(/^\t/gm, "");

				var code = $.create("code", {
					textContent: source,
					inside: pre
				});

				Prism.highlightElement(pre);
			}

			this.textContent = (pre.classList.contains("visible")? "Show" : "Hide") + " implementation";
			pre.classList.toggle("visible");
		}
	});
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
			
			var fn = content.match(/jQuery(?:\.fn)?\.([a-z]+)/i)[1];

			if (content.indexOf('jQuery.fn') === -1) {
				url += "jQuery."
			}

			a.href = url + fn;
		}

		a.texContent += "()";
	});
}

$$("#download input[type=radio]")._.events({click: function(){
	var elements = this.form.elements;
	$("#download a[download]").href = "bliss" + elements.type.value + elements.compression.value + ".js";
}});

// TODO Find references to Bliss functions and make them links to the docs