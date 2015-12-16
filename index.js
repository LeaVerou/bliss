(function(){
function titleToId(title) {
	return title.trim().replace(/^\$\.|\(\)$/g, "");
}

// Add ids and implementation to all functions
$$("#docs article > h1").forEach(function(h1) {
	var article = h1.parentNode;

	h1.firstChild.textContent = h1.firstChild.textContent.trim();
	
	var fn = titleToId(h1.firstChild.textContent);

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

				if (fn === "$" || fn === "$$") {
					var source = self[fn] + "";
				}
				else if (fn.indexOf("hooks.") === 0) {
					var source = $.hooks[fn.replace(/^hooks./, "")] + "";
				}
				else {
					var source = ($.sources[fn] || $[fn]) + "";	
				}
				

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
		section.id = h1.textContent.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
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

	$$("article[id^='fn-'] h1.set").forEach(function(h1){
		var id = h1.parentNode.id;

		$.set(document.createDocumentFragment(), {
			contents: [
				{tag: "dt",
					contents: {tag: "a",
						href: "#" + id,
						textContent: id.replace(/^fn-/, "")
					}
				},
				{tag: "dd",
					textContent: h1.nextElementSibling.textContent
				}
			],
			start: $("#fn-set .args dl")
		});
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

// Find references to Bliss functions and make them links to the docs
$$(":not(pre) > code").forEach(function(code){
	if (/\$.*\(\)/.test(code.textContent)) {
		$.create("a", {
			href: "#fn-" + titleToId(code.textContent),
			around: code
		});
	}
});

$$("#download input[type=radio]")._.events({click: function(){
	var elements = this.form.elements;
	$("#download a[download]").href = "bliss" + elements.type.value + elements.compression.value + ".js";
}});

$$(".runnable").forEach(function(p){
	$.create("button", {
		textContent: "Run",
		className: "run",
		once: {
			click: function(){
				$.create("script", {
					textContent: $("pre.bliss code", p.nextElementSibling).textContent,
					after: p
				});
				$.remove(this);
			}
		},
		inside: p
	})
});

// Linkify types to MDN
var urls = {};

// Add global objects
["Object", "String", "Array", "Number", "Function", "RegExp", "Boolean"].forEach(function(type){
	urls[type] = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/" + type;
});

// Add APIs
["Node", "Element", "Text", "Document", "Promise"].forEach(function(type){
	urls[type] = "https://developer.mozilla.org/en-US/docs/Web/API/" + type;
});

self.typeRegex = RegExp("\\b(?:" + Object.keys(urls).join("|") + ")\\b", "g");

$$(".args dt[class]").forEach(function(dt){
	var types = ["Type: "];

	$$(dt.classList).forEach(function(clas, i, arr){
		var type = (clas + "").replace(/^./, function($0) { return $0.toUpperCase() });

		if (urls[type]) {
			if (i > 0) {
				types.push(i === arr.length - 1? " or " : ", ");
			}

			types.push($.create("a", {
				href: urls[type],
				textContent: type
			}));
		}
	});

	$.create("dd", {
		className: "type",
		contents: types,
		after: dt
	});
});

})();