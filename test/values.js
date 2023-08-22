
export class Cat {}

export class Dog {
    foo = 1;

    constructor() {
        this.notta = null;

        Object.defineProperty(this, 'hidden', {
            enumerable: false,
            value: 3,
        });
    }

    get bar() {
        return 2;
    }
}

export const arrowFunc = () => {
    return null;
};

export function funcDef() {
    return null;
}

export function getValues(mapper, _undefined) {
    /* eslint-disable brace-style, array-bracket-spacing, max-statements-per-line */
    const list = [
        [ null, 'null' ],
        [ _undefined, 'undefined' ],
        [ true, 'true' ],
        [ false, 'false' ],
        [ Boolean(1), 'Boolean(1)' ],
        [ Boolean(0), 'Boolean(0)' ],
        [ -1, '-1' ],
        [ 0, '0' ],
        [ 1, '1' ],
        [ 0.1, '0.1' ],
        [ Number(-1), 'Number(-1)' ],
        [ Number(0), 'Number(0)' ],
        [ Number(1), 'Number(1)' ],
        [ Number(0.1), 'Number(0.1)' ],
        [ NaN, 'NaN' ],
        [ BigInt(-1), 'BigInt(-1)' ],
        [ BigInt(0), 'BigInt(0)' ],
        [ BigInt(1), 'BigInt(1)' ],
        [ '', 'empty String' ],
        [ 'foo', '"foo"' ],
        [ String(''), 'String("")' ],
        [ String('foo'), 'String("foo")' ],
        [ Symbol(), 'Symbol()' ],
        [ Symbol('foo'), 'Symbol("foo")' ],
        [ Dog, 'class Dog' ],
        [ arrowFunc, 'arrow function expression' ],
        [ funcDef, 'function definition' ],
        [ () => { return null; }, 'anonymous arrow function' ],
        [ function () { return null; }, 'anonymous function' ],
        [ {}, 'emty Object {}' ],
        [ Object.create(null), 'Object.create(null)' ],
        [ { foo: 'bar' }, '{ foo: "bar" }' ],
        [ new Dog(), 'new Dog()' ],
        [ new Cat(), 'new Cat()' ],
        [ new Date(), 'new Date()' ],
        [ [], 'empty Array []' ],
        [ [ 1 ], 'Array [ 1 ]' ],
        [ new Map(), 'new Map()' ],
        [ new Map([[ 'one', 1 ], [ 'two', 2 ]]), 'new Map([[ "one", 1 ], [ "two", 2 ]])' ],
        [ new Set(), 'new Set()' ],
        [ new Set([ 1, 2 ]), 'new Set([ 1, 2 ])' ],
    ];
    /* eslint-enable brace-style, array-bracket-spacing, max-statements-per-line */

    return list.map(mapper);
}
