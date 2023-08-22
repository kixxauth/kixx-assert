import {
    AssertionError,
    toFriendlyString,
    isPrimitive
} from '../mod.js';

import { getValues } from './values.js';


export default function test_isPrimitive() {
    const list = [
        true, // [ null, 'null' ],
        true, // [ _undefined, 'undefined' ],
        true, // [ true, 'true' ],
        true, // [ false, 'false' ],
        true, // [ Boolean(1), 'Boolean(1)' ],
        true, // [ Boolean(0), 'Boolean(0)' ],
        true, // [ -1, '-1' ],
        true, // [ 0, '0' ],
        true, // [ 1, '1' ],
        true, // [ 0.1, '0.1' ],
        true, // [ Number(-1), 'Number(-1)' ],
        true, // [ Number(0), 'Number(0)' ],
        true, // [ Number(1), 'Number(1)' ],
        true, // [ Number(0.1), 'Number(0.1)' ],
        true, // [ NaN, 'NaN' ],
        true, // [ BigInt(-1), 'BigInt(-1)' ],
        true, // [ BigInt(0), 'BigInt(0)' ],
        true, // [ BigInt(1), 'BigInt(1)' ],
        true, // [ '1', '"1"' ],
        true, // [ '0.1', '"0.1"' ],
        true, // [ '7n', '"7n"' ],
        true, // [ '', 'empty String' ],
        true, // [ 'foo', '"foo"' ],
        true, // [ String(''), 'String("")' ],
        true, // [ String('foo'), 'String("foo")' ],
        true, // [ Symbol(), 'Symbol()', ],
        true, // [ Symbol('foo'), 'Symbol("foo")' ],
        false, // [ Dog, 'class Dog' ],
        false, // [ arrowFunc, 'arrow function expression' ],
        false, // [ funcDef, 'function definition' ],
        false, // [ () => { return null; }, 'anonymous arrow function' ],
        false, // [ function () { return null; }, 'anonymous function' ],
        false, // [ {}, 'empty Object {}' ],
        false, // [ Object.create(null), 'Object.create(null)' ],
        false, // [ { foo: 'bar' }, '{ foo: "bar" }' ],
        false, // [ new Dog(), 'new Dog()' ],
        false, // [ new Cat(), 'new Cat()' ],
        false, // [ new Date(), 'new Date()' ],
        false, // [ [], 'empty Array []' ],
        false, // [ [ 1 ], 'Array [ 1 ]' ],
        false, // [ new Map(), 'new Map()' ],
        false, // [ new Map([[ 'one', 1 ], [ 'two', 2 ]]), 'new Map([[ "one", 1 ], [ "two", 2 ]])' ],
        false, // [ new Set(), 'new Set()' ],
        false, // [ new Set([ 1, 2 ]), 'new Set([ 1, 2 ])' ],
    ];

    const tests = getValues(([ val, messageSuffix ], index) => {
        const expectedResult = list[index];
        return [ val, `for ${ messageSuffix };`, expectedResult ];
    });

    if (tests.length !== list.length) {
        throw new AssertionError(
            `Values length ${ tests.length } is not expected length of ${ list.length }`
        );
    }

    tests.forEach(([ val, messageSuffix, expectedResult ]) => {
        if (typeof messageSuffix !== 'string') {
            throw new AssertionError(
                `Expected messageSuffix ${ toFriendlyString(messageSuffix) } to be a String`
            );
        }
        if (typeof expectedResult !== 'boolean') {
            throw new AssertionError(
                `Expected expectedResult ${ toFriendlyString(expectedResult) } to be a Boolean`
            );
        }

        const result = isPrimitive(val);

        if (result !== expectedResult) {
            let msg = `Got ${ toFriendlyString(result) }`;
            msg += ` when expecting ${ toFriendlyString(expectedResult) } `;
            throw new AssertionError(msg + messageSuffix);
        }
    });

    // eslint-disable-next-line no-console,no-undef
    console.log('Test isPrimitive() passed.');
}