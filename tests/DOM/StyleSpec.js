describe("$.style", function() {
    it("exists", function() {
        expect($.style).to.exist;
    });

    it("sets simple style to element", function() {
        var el = document.createElement("li");

        $.style(el, {
            color: "red"
        });

        expect(el.style.color).to.equal("red");
    });

    it("sets simple style to element using _ operator", function() {
        var el = document.createElement("li");

        el._.style({
            color: "red"
        });

        expect(el.style.color).to.equal("red");
    });

    it("sets multiple styles to element", function() {
        var el = document.createElement("li");

        $.style(el, {
            color: "red",
            backgroundColor: "white",
            fontSize: "20px"
        });

        expect(el.style.color).to.equal("red");
        expect(el.style.backgroundColor).to.equal("white");
        expect(el.style.fontSize).to.equal("20px");
    });

    it("sets multiple styles to element using _ operator", function() {
        var el = document.createElement("li");

        el._.style({
            color: "red",
            backgroundColor: "white",
            fontSize: "20px"
        });

        expect(el.style.color).to.equal("red");
        expect(el.style.backgroundColor).to.equal("white");
        expect(el.style.fontSize).to.equal("20px");
    });

    it("sets simple style to array", function() {
        var arr = [
                document.createElement("li"),
                document.createElement("li"),
                document.createElement("li")
            ];

        $.style(arr, {
            color: "red"
        });

        arr.forEach(function(item) {
            expect(item.style.color).to.equal("red");
        });
    });

    it("sets multiple styles to array", function() {
        var arr = [
                document.createElement("li"),
                document.createElement("li"),
                document.createElement("li")
            ];

        $.style(arr, {
            color: "red",
            backgroundColor: "white",
            fontSize: "20px"
        });

        arr.forEach(function(item) {
            expect(item.style.color).to.equal("red");
            expect(item.style.backgroundColor).to.equal("white");
            expect(item.style.fontSize).to.equal("20px");
        });
    });

    it("sets simple style to array using _ operator", function() {
        var arr = [
                document.createElement("li"),
                document.createElement("li"),
                document.createElement("li")
            ];

        arr._.style({
            color: "red"
        });

        arr.forEach(function(item) {
            expect(item.style.color).to.equal("red");
        });
    });

    it("sets multiple styles to array using _ operator", function() {
        var arr = [
                document.createElement("li"),
                document.createElement("li"),
                document.createElement("li")
            ];

        arr._.style({
            color: "red",
            backgroundColor: "white",
            fontSize: "20px"
        });

        arr.forEach(function(item) {
            expect(item.style.color).to.equal("red");
            expect(item.style.backgroundColor).to.equal("white");
            expect(item.style.fontSize).to.equal("20px");
        });
    });

    it("allows chaining with elements", function() {
        var el = document.createElement("li");

        $.style(el, {
            color: "red"
        })._.style({
            backgroundColor: "white"
        });

        expect(el.style.color).to.equal("red");
        expect(el.style.backgroundColor).to.equal("white");
    });

    it("allows chaining with arrays", function() {
        var arr = [
                document.createElement("li"),
                document.createElement("li"),
                document.createElement("li")
            ];

        $.style(arr, {
            color: "red"
        })._.style({
            backgroundColor: "white"
        });

        arr.forEach(function(item) {
            expect(item.style.color).to.equal("red");
            expect(item.style.backgroundColor).to.equal("white");
        });
    });
});