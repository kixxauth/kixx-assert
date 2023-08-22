import {
    AssertionError,
    toFriendlyString,
    assertThrowsErrorMessage,
    assertFalsy
} from '../mod.js';

import { getValues } from './values.js';


export default function test_assertFalsy() {
    const list = [
        true, // [ null, 'null' ],
        true, // [ _undefined, 'undefined' ],
        false, // [ true, 'true' ],
        true, // [ false, 'false' ],
        false, // [ Boolean(1), 'Boolean(1)' ],
        true, // [ Boolean(0), 'Boolean(0)' ],
        false, // [ -1, '-1' ],
        true, // [ 0, '0' ],
        false, // [ 1, '1' ],
        false, // [ 0.1, '0.1' ],
        false, // [ Number(-1), 'Number(-1)' ],
        true, // [ Number(0), 'Number(0)' ],
        false, // [ Number(1), 'Number(1)' ],
        false, // [ Number(0.1), 'Number(0.1)' ],
        true, // [ NaN, 'NaN' ],
        false, // [ BigInt(-1), 'BigInt(-1)' ],
        true, // [ BigInt(0), 'BigInt(0)' ],
        false, // [ BigInt(1), 'BigInt(1)' ],
        false, // [ '1', '"1"' ],
        false, // [ '0.1', '"0.1"' ],
        false, // [ '7n', '"7n"' ],
        true, // [ '', 'empty String' ],
        false, // [ 'foo', '"foo"' ],
        true, // [ String(''), 'String("")' ],
        false, // [ String('foo'), 'String("foo")' ],
        false, // [ Symbol(), 'Symbol()', ],
        false, // [ Symbol('foo'), 'Symbol("foo")' ],
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
        false, // [ new Date(2019, 0, 3, 4, 20, 1, 10), 'new Date(2019, 0, 3, 4, 20, 1, 10)' ],
        false, // [ new Date('invalid'), 'new Date("invalid")', false ],
        false, // [ [], 'empty Array []' ],
        false, // [ [ 1 ], 'Array [ 1 ]' ],
        false, // [ new Map(), 'new Map()' ],
        false, // [ new Map([[ 'one', 1 ], [ 'two', 2 ]]), 'new Map([[ "one", 1 ], [ "two", 2 ]])' ],
        false, // [ new Set(), 'new Set()' ],
        false, // [ new Set([ 1, 2 ]), 'new Set([ 1, 2 ])' ],
    ];

    const tests = getValues(([ val, messageSuffix ], index) => {
        const expectedToPass = list[index];
        return [ val, `for ${ messageSuffix };`, expectedToPass ];
    });

    if (tests.length !== list.length) {
        throw new AssertionError(
            `Values length ${ tests.length } is not expected length of ${ list.length }`
        );
    }

    tests.forEach(([ val, messageSuffix, expectedToPass ]) => {
        if (typeof messageSuffix !== 'string') {
            throw new AssertionError(
                `Expected messageSuffix ${ toFriendlyString(messageSuffix) } to be a String`
            );
        }
        if (typeof expectedToPass !== 'boolean') {
            throw new AssertionError(
                `Expected expectedToPass ${ toFriendlyString(expectedToPass) } to be a Boolean`
            );
        }

        messageSuffix = 'with ' + messageSuffix;

        if (expectedToPass) {
            assertFalsy(val, messageSuffix);
        } else {
            assertThrowsErrorMessage(messageSuffix, () => {
                assertFalsy(val, messageSuffix);
            }, messageSuffix);
        }
    });

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertFalsy() passed.');
}
