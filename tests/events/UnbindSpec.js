describe("$.unbind", function () {

    helpers.fixture("events.html");
    var spy1, spy2, spy3, subject;

    beforeEach(function () {
        spy1 = sinon.spy();
        spy2 = sinon.spy();
        spy3 = sinon.spy();
        subject = document.querySelector("#simpleDiv");
    });

    it("exists", function () {
        expect($.unbind).to.exist;
    });

    it("unbinds events using namespaces", function (done) {
        // Setup
        subject.addEventListener("click.namespace1", spy1);
        subject.addEventListener("click.namespace1", spy2);
        subject.addEventListener("click.namespace2", spy3);

        // Exercise
        $.unbind(subject, ".namespace1");
        fireEvent(subject, "click");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.notCalled).to.be.ok;
        expect(spy3.calledOnce).to.be.ok;

        done();
    });

    it("unbinds a single event listener", function (done) {
        // Setup
        subject.addEventListener("click", spy1);
        subject.addEventListener("click", spy2);
        subject.addEventListener("change", spy3);

        // Exercise
        $.unbind(subject, "click", spy1);
        fireEvent(subject, "click");
        fireEvent(subject, "change");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.calledOnce).to.be.ok;
        expect(spy3.calledOnce).to.be.ok;

        done();
    });

    it("unbinds a single event listener when passed an object", function (done) {
        // Setup
        subject.addEventListener("click", spy1);
        subject.addEventListener("click", spy2);
        subject.addEventListener("change", spy3);

        // Exercise
        $.unbind(subject, {click: spy1});
        fireEvent(subject, "click");
        fireEvent(subject, "change");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.calledOnce).to.be.ok;
        expect(spy3.calledOnce).to.be.ok;

        done();
    });

    it("unbinds listeners when only type passed", function (done) {
        // Setup
        subject.addEventListener("click", spy1);
        subject.addEventListener("click", spy2);
        subject.addEventListener("change", spy3);

        // Exercise
        $.unbind(subject, "click");
        fireEvent(subject, "click");
        fireEvent(subject, "change");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.notCalled).to.be.ok;
        expect(spy3.calledOnce).to.be.ok;

        done();
    });

    it("unbinds multiple event listeners", function (done) {
        // Setup
        subject.addEventListener("click", spy1);
        subject.addEventListener("change", spy1);
        subject.addEventListener("click", spy2);
        subject.addEventListener("change", spy2);

        // Exercise
        $.unbind(subject, "click change", spy1);
        fireEvent(subject, "click");
        fireEvent(subject, "change");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.calledTwice).to.be.ok;

        done();
    });

    it("unbinds multiple event listeners when passed object", function (done) {
        // Setup
        subject.addEventListener("click", spy1);
        subject.addEventListener("change", spy1);
        subject.addEventListener("click", spy2);
        subject.addEventListener("change", spy2);

        // Exercise
        $.unbind(subject, {"click change": spy1});
        fireEvent(subject, "click");
        fireEvent(subject, "change");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.calledTwice).to.be.ok;

        done();
    });

    it("unbinds all event listeners", function (done) {
        // Setup
        subject.addEventListener("click", spy1);
        subject.addEventListener("change", spy1);
        subject.addEventListener("click", spy2);
        subject.addEventListener("change", spy3);
        subject.addEventListener("click.namespace1.bar", spy2);

        // Exercise
        $.unbind(subject);
        fireEvent(subject, "click");
        fireEvent(subject, "change");

        // Verify
        expect(spy1.notCalled).to.be.ok;
        expect(spy2.notCalled).to.be.ok;
        expect(spy3.notCalled).to.be.ok;

        done();
    });

    function fireEvent(target, eventName) {
        var event = new Event(eventName, {"bubbles": true, "cancelable": true});
        target.dispatchEvent(event);
    }

});