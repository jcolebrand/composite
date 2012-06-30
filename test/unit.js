var compose = require("..")
    , composeAsync = compose.async
    , sinon = require("sinon")
    , assert = require("assert")
    , curry = require("ap").curry
    , test = require("testling")
    , globalScope = typeof global === "undefined" ? window : global

test("compose with empty functions", function (t) {
    var a = sinon.spy()
        , b = sinon.spy()

    var composed = compose(a, b)
        , result = composed(5)

    t.equal(typeof composed, "function", "composed is not a function")
    t.ok(a.calledOnce, "a was not called once")
    t.ok(a.calledWith(5), "a was not called with 5")
    t.ok(b.calledOnce, "b was not called once")
    t.ok(b.calledWith(undefined), "b was not called with undefined")
    t.equal(result, undefined, "result is not undefined")

    t.end()
})

test("compose with non-trivial functions", function (t) {
    var a = sinon.stub().returns(4)
        , b = sinon.stub().returns(8)
        , composed = compose(a, b)
        , result = composed(5)

    t.equal(typeof composed, "function", "composed is not a function")
    t.ok(a.calledOnce, "a was not called once")
    t.ok(a.calledWith(5), "a was not called with 5")
    t.ok(b.calledOnce, "b was not called once")
    t.ok(b.calledWith(4), "b was not called with 4")
    t.equal(result, 8, "result is not 8")

    t.end()
})

test("with array values", function (t)  {
    var a = sinon.stub().returns([1,2,3])
        , b = sinon.spy()

    var composed = compose(a, b)
        , result = composed(5)

    t.equal(typeof composed, "function", "composed is not a function")
    t.ok(a.calledOnce, "a was not called once")
    t.ok(a.calledWith(5), "a was not called with 5")
    t.ok(b.calledOnce, "b was not called once")
    t.ok(b.calledWith(1,2,3), "b was not called with 1,2,3")
    t.equal(result, undefined, "result is not undefined")

    t.end()
})

test("with thisValue", function (t) {
    var a = sinon.spy()
        , b = sinon.spy()
        , thisValue = {}

    var composed = compose(a, b)
        , result = composed.call(thisValue)

    t.equal(typeof composed, "function", "composed is not a function")
    t.ok(a.calledOnce, "a was not called once")
    t.ok(a.calledWith(undefined), "a was not called with undefined")
    t.equal(a.thisValues[0], thisValue,
        "a was not called with correct this value")
    t.ok(b.calledOnce, "b was not called once")
    t.ok(b.calledWith(undefined), "b was not called with undefined")
    t.equal(b.thisValues[0], thisValue,
        "b was not called with correct this value")
    t.equal(result, undefined, "result is not undefined")

    t.end()
})

test("with a fresh thisValue", function (t) {
    var a = sinon.spy()
        , b = sinon.spy()

    var composed = compose(a, b)
        , result = composed()

    t.equal(typeof composed, "function", "composed is not a function")
    t.ok(a.calledOnce, "a was not called once")
    t.ok(a.calledWith(undefined), "a was not called with undefined")
    t.ok(b.calledOnce, "b was not called once")
    t.ok(b.calledWith(undefined), "b was not called with undefined")
    t.equal(result, undefined, "result is not undefined")
    t.equal(a.thisValues[0], b.thisValues[0],
        "thisValues are not the same")
    t.equal(typeof a.thisValues[0], "object",
        "this value is not an object")
    t.ok(a.thisValues[0] !== globalScope, "thisValue is the global object")

    t.end()
})

test("with multiple functions", function (t) {
    var a = sinon.spy()
        , b = sinon.spy()
        , c = sinon.spy()
        , d = sinon.spy()

    var composed = compose(a, b, c, d)
        , result = composed()

    t.equal(typeof composed, "function", "composed is not a function")
    t.ok(a.calledOnce, "a was not called once")
    t.ok(a.calledWith(undefined), "a was not called with undefined")
    t.ok(b.calledOnce, "b was not called once")
    t.ok(b.calledWith(undefined), "b was not called with undefined")
    t.ok(c.calledOnce, "c was not called once")
    t.ok(c.calledWith(undefined), "c was not called with undefined")
    t.ok(d.calledOnce, "d was not called once")
    t.ok(d.calledWith(undefined), "d was not called with undefined")
    t.equal(result, undefined, "result is not undefined")

    t.end()
})

test("calling composite.async", function (t) {
    t.ok(true, "-.-")

    t.end()
})