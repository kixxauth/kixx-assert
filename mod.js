/**
 * A helper library for performing assertions which are not native to
 * JavaScript out of the box, or are implemented in unexpected ways.
 *
 * There are generally two groups of functions available in this library:
 *
 * 1. Helper functions which allow you to perform various kinds of type checks
 *    which you wouldn't otherwise find in JavaScript.
 * 2. Assertion functions which throw an AssertionError when the assertion is
 *    not true.
 * The MIT License
 *
 * Copyright (c) 2017 - 2025 Kris Walker (www.kriswalker.me).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
const protoToString = Object.prototype.toString;

export class AssertionError extends Error {

    /**
     * @param  {string} message Will become the message string passed to the native Error constructor.
     * @param  {object} [spec] Object with shape { cause, httpStatusCode, code, name }
     * @param  {function} [sourceFunction] Will be passed to the native Error.captureStackTrace
     */
    constructor(message, spec, sourceFunction) {
        spec = spec || {};
        const cause = spec.cause || null;

        super(message, { cause });

        const name = spec.name || this.constructor.name;

        const causeCode = cause && cause.code;
        const code = spec.code || causeCode || this.constructor.CODE;

        // Use Object.defineProperty() so we can have public, enumerable
        // properties, but make them unwritable.
        // Secondly, only define properties if they exist.

        if (typeof name !== 'undefined') {
            Object.defineProperty(this, 'name', {
                enumerable: true,
                value: name,
            });
        }
        if (typeof code !== 'undefined') {
            Object.defineProperty(this, 'code', {
                enumerable: true,
                value: code,
            });
        }

        if (typeof sourceFunction === 'function') {
            Error.captureStackTrace(this, sourceFunction);
        }
    }
}

Object.defineProperties(AssertionError, {
    name: {
        enumerable: true,
        value: 'AssertionError',
    },
    code: {
        enumerable: true,
        value: 'ASSERTION_ERROR',
    },
});

/**
 * Determine if the given value is a String.
 * @param  {*} x
 * @return {Boolean}
 */
export function isString(x) {
    // The typeof expression will not catch strings created
    // with new String('foo'):
    //
    // ```js
    // return typeof new String('foo') === 'string'; // false
    // ```
    //
    // So we use `Object.prototype.toString` instead.
    return protoToString.call(x) === '[object String]';
}

/**
 * Determine if the given value is a String with length greater
 * than zero. Uses `isString()`.
 * @see {@link isString}
 * @param  {*} x
 * @return {Boolean}
 */
export function isNonEmptyString(x) {
    return Boolean(x && isString(x));
}

/**
 * Determine if the given value is a Number. Also returns
 * `true` for BigInt instances.
 * @param  {*} x
 * @return {Boolean}
 */
export function isNumber(x) {
    // The typeof expression will not catch numbers created with new Number(1):
    //
    // ```js
    // return typeof new Number(1) === 'number'; // false
    // ```
    //
    // So we use `Object.prototype.toString` instead.
    const tag = protoToString.call(x);
    return tag === '[object Number]' || tag === '[object BigInt]';
}

/**
 * Determine if the given value is a Number but is not NaN. Uses `isNumber()`.
 * @see {@link isNumber}
 * @param  {*} x
 * @return {Boolean}
 */
export function isNumberNotNaN(x) {
    return isNumber(x) && !Number.isNaN(x);
}

/**
 * Determine if the given value is a Boolean.
 * @param  {*} x
 * @return {Boolean}
 */
export function isBoolean(x) {
    // The typeof expression will not catch values created with new Boolean(1):
    //
    // ```js
    // return typeof new Boolean(1) === 'boolean'; // false
    // ```
    //
    // So we use `Object.prototype.toString` instead.
    return protoToString.call(x) === '[object Boolean]';
}

/**
 * Determine if the given value is undefined by
 * checking typeof x === 'undefined'.
 * @param  {*} x
 * @return {Boolean}
 */
export function isUndefined(x) {
    return typeof x === 'undefined';
}

/**
 * Determine if the given value is a primitive value. Primitive values are
 * defined as String, Number, BigInt, Boolean, Symbol, null, and undefined.
 * @param  {*} x
 * @return {Boolean}
 */
export function isPrimitive(x) {
    return x === null
        || isString(x)
        || isNumber(x)
        || (typeof x === 'bigint')
        || isBoolean(x)
        || (typeof x === 'symbol')
        || isUndefined(x);
}

/**
 * Determine if the given value is a Function. This will work as expected for
 * function declarations, function expressions, async functions,
 * class static methods, class methods, and object methods.
 * @param  {*} x
 * @return {Boolean}
 */
export function isFunction(x) {
    return typeof x === 'function';
}

/**
 * Determine if the given value is a plain object. First, check to see if the
 * value is an object at all. Then if the object does not have a prototype OR
 * it has a constructor named "Object", then consider it a "plain" object.
 * @param  {*} x
 * @return {Boolean}
 */
export function isPlainObject(x) {
    if (!x || typeof x !== 'object') {
        return false;
    }
    if (!Object.getPrototypeOf(x)) {
        return true;
    }
    return x.constructor && x.constructor.name === 'Object';
}

/**
 * Determine if the given value is a native JavaScript Date instance.
 * @param  {*} x
 * @return {Boolean}
 */
export function isDate(x) {
    // Using the protoToString tag is more reliable than using `instanceof`.
    return protoToString.call(x) === '[object Date]';
}

/**
 * Determine if the given value is a *valid* JavaScript Date instance.
 * Validity is determined by checking
 * isNaN() of .getTime(): `isNaN(x.getTime())`.
 * @param  {*} x
 * @return {Boolean}
 */
export function isValidDate(x) {
    if (isDate(x)) {
        return !Number.isNaN(x.getTime());
    }
    return false;
}

/**
 * Determine if the given value is a native JavaScript RegExp instance.
 * @param  {*} x
 * @return {Boolean}
 */
export function isRegExp(x) {
    // Using the protoToString tag is more reliable than using `instanceof`.
    return protoToString.call(x) === '[object RegExp]';
}

/**
 * Determine if the given value is a native JavaScript Map or WeakMap. This
 * will work as expected, returning true when passing an instance of a class
 * which extends Map or WeakMap.
 * @param  {*} x
 * @return {Boolean}
 */
export function isMap(x) {
    // Using the protoToString tag is more reliable than using `instanceof`.
    const tag = protoToString.call(x);
    return tag === '[object Map]' || tag === '[object WeakMap]';
}

/**
 * Determine if the given value is a native JavaScript Set or WeakSet. This
 * will work as expected, returning true when passing an instance of a class
 * which extends Set or WeakSet.
 * @param  {*} x
 * @return {Boolean}
 */
export function isSet(x) {
    // Using the protoToString tag is more reliable than using `instanceof`.
    const tag = protoToString.call(x);
    return tag === '[object Set]' || tag === '[object WeakSet]';
}

/**
 * Compare two values for equality. If `a === b` then
 * returns `true`. Otherwise ensure date and NaN comparison is
 * done as expected.
 *
 * Will return a curried version of this function if only
 * a single argument is supplied.
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */
export function isEqual(a, b) {
    if (arguments.length < 2) {
        return function curriedIsEqual(_b) {
            return isEqual(a, _b);
        };
    }
    if (a === b) {
        return true;
    }
    if (isValidDate(a) && isValidDate(b)) {
        return a <= b && a >= b;
    }
    // Make sure NaN === NaN.
    return a !== a && b !== b;
}

/**
 * Performs string matching, with some caveats. If the matcher is a
 * regular expression then doesMatch() will call RegExp:test(). If the
 * matcher equals x using isEqual() then return true. If x is a String then
 * check to see if the String contains the matcher with String:includes().
 * If x is a valid Date then convert it to a string using Date:toISOString()
 * before making the comparison.
 *
 * Will return a curried version of this function if only
 * a single argument is supplied.
 *
 * @see {@link isEqual}
 * @see {@link isValidDate}
 * @param {String|RegExp} matcher
 * @param {*} x
 * @return {Boolean}
 */
export function doesMatch(matcher, x) {
    if (arguments.length < 2) {
        return function curriedDoesMatch(_x) {
            return doesMatch(matcher, _x);
        };
    }
    if (isEqual(matcher, x)) {
        return true;
    }

    if (isValidDate(x)) {
        x = x.toISOString();
    }

    if (typeof matcher?.test === 'function') {
        return matcher.test(x);
    }
    if (typeof x?.includes === 'function') {
        return x.includes(matcher);
    }

    return false;
}

/**
 * Convert any JavaScript value to a human friendly string.
 * @param  {*} x
 * @return {String}
 */
export function toFriendlyString(x) {
    if (isString(x)) {
        return `String(${ x })`;
    }
    if (typeof x === 'bigint') {
        return `BigInt(${ x })`;
    }
    // WARNING
    // Checking isNumber() will return true for BigInt instances as well as
    // Numbers, so the isBigInt() check needs to come before isNumber().
    if (isNumber(x)) {
        return `Number(${ x })`;
    }
    if (isBoolean(x)) {
        return `Boolean(${ x })`;
    }
    if (typeof x === 'symbol') {
        return x.toString();
    }
    if (isUndefined(x)) {
        return 'undefined';
    }
    if (isFunction(x)) {
        if (x.toString().startsWith('class ')) {
            return `class ${ x.name } {}`;
        }
        // This will get "Function" or "AsyncFunction":
        const prefix = protoToString.call(x).slice(8, -1);
        if (x.name) {
            return `${ prefix }(${ x.name })`;
        }
        return `${ prefix }(function)`;
    }
    if (x === null) {
        return 'null';
    }
    if (Object.getPrototypeOf(x) === null) {
        return 'Object(null)';
    }
    if (isPlainObject(x)) {
        return 'Object({})';
    }
    if (Array.isArray(x)) {
        if (x.length === 0) {
            return 'Array([])';
        }
        return `Array([0..${ (x.length - 1) }])`;
    }
    if (isValidDate(x)) {
        return `Date(${ x.toISOString() })`;
    }
    if (isDate(x)) {
        return 'Date(Invalid)';
    }
    if (isRegExp(x)) {
        return `RegExp(${ x })`;
    }
    if (isMap(x) || isSet(x)) {
        return `${ x.constructor.name }()`;
    }

    const name = x.constructor?.name || 'Object';

    return `${ name }(${ x })`;
}

/**
 * Create a function which can create assertion functions which can be curried.
 * If the returned function is called with only a single argument then it will
 * return a curried version of the assertion function.
 *
 * @param  {String} operator The name of the assertion operator which will be
 * passed to new AssertionError({ operator })
 * @param  {Function} guard The guard function should return a message string
 * in the case of failure and null in the case of success.
 * @return {Function}
 *
 * @example
 * const assertEqual = curryAssertion2('assertEqual', (expected, actual, messagePrefix) => {
 *     if (actual !== expected) {
 *         return `${messagePrefix}. Values are not equal.`;
 *     }
 *     return null;
 * });
 *
 * const assertIsZero = assertEqual(0);
 *
 * // This will fail.
 * assertIsZero(1, 'What happens when we pass in 1?');
 */
export function curryAssertion2(operator, guard) {
    return function curriedAssertion2(expected, actual, messagePrefix) {
        if (arguments.length < 2) {
            return function curriedInnerAssert(_actual, _messagePrefix) {
                // eslint-disable-next-line no-shadow
                const message = guard(expected, _actual, _messagePrefix);
                if (message) {
                    throw new AssertionError(message, { operator }, curriedInnerAssert);
                }

                return true;
            };
        }

        const message = guard(expected, actual, messagePrefix);
        if (message) {
            throw new AssertionError(message, { operator }, curriedAssertion2);
        }

        return true;
    };
}

/**
 * Assert the given value is truthy. If not, assert() will throw an AssertionError
 *
 * @param  {*} actual The value to test.
 * @param  {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assert(actual, messagePrefix) {
    const assertionMessage = `Expected ${ toFriendlyString(actual) } to be truthy`;

    const message = isNonEmptyString(messagePrefix)
        ? `${ messagePrefix } (${ assertionMessage })`
        : assertionMessage;

    if (!actual) {
        throw new AssertionError(message, { operator: 'assert' }, assert);
    }
}

/**
 * Assert the given value is falsy. If not, assertFalsy() will throw an AssertionError
 *
 * @param  {*} actual The value to test.
 * @param  {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertFalsy(actual, messagePrefix) {
    const assertionMessage = `Expected ${ toFriendlyString(actual) } to be falsy`;

    const message = isNonEmptyString(messagePrefix)
        ? `${ messagePrefix } (${ assertionMessage })`
        : assertionMessage;

    if (actual) {
        throw new AssertionError(message, { operator: 'assertFalsy' }, assertFalsy);
    }
}

/**
 * Asserts equalty using isEqual(). If the actual value does not equal the
 * expected value then an AssertionError will be thrown.
 *
 * @see {@link isEqual}
 * @param {*} expected The value to test against.
 * @param {*} actual The value to test.
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export const assertEqual = curryAssertion2('assertEqual', (expected, actual, messagePrefix) => {
    if (!isEqual(expected, actual)) {
        const assertionMessage = `Expected ${ toFriendlyString(actual) } to equal (===) ${ toFriendlyString(expected) }`;
        return isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;
    }
    return null;
});

/**
 * Asserts NON equalty using isEqual(). If the actual value equals the expected
 * value then an AssertionError will be thrown.
 *
 * @see {@link isEqual}
 * @param {*} expected The value to test against.
 * @param {*} actual The value to test.
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export const assertNotEqual = curryAssertion2('assertNotEqual', (expected, actual, messagePrefix) => {
    if (isEqual(expected, actual)) {
        const assertionMessage = `Expected ${ toFriendlyString(actual) } to NOT equal (!==) ${ toFriendlyString(expected) }`;
        return isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;
    }
    return null;
});

/**
 * Asserts that the actual value matches the matcher value according
 * to doesMatch(). If the actual does not match the matcher then an AssertionError
 * will be thrown.
 *
 * @see {@link doesMatch}
 * @param {*} matcher The matcher to test against. See doesMatch() for more info.
 * @param {*} actual The value to test. See doesMatch() for more info.
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export const assertMatches = curryAssertion2('assertMatches', (matcher, actual, messagePrefix) => {
    if (!doesMatch(matcher, actual)) {
        const assertionMessage = `Expected ${ toFriendlyString(actual) } to match ${ toFriendlyString(matcher) }`;
        return isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;
    }
    return null;
});

/**
 * Asserts that the actual value DOES NOT match the matcher value according
 * to doesMatch(). If the actual value matches the matcher then an AssertionError
 * will be thrown.
 *
 * @see {@link doesMatch}
 * @param {*} matcher The matcher to test against. See doesMatch() for more info.
 * @param {*} actual The value to test. See doesMatch() for more info.
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export const assertNotMatches = curryAssertion2('assertNotMatches', (matcher, actual, messagePrefix) => {
    if (doesMatch(matcher, actual)) {
        const assertionMessage = `Expected ${ toFriendlyString(actual) } NOT to match ${ toFriendlyString(matcher) }`;
        return isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;
    }
    return null;
});

/**
 * Asserts that the given value is not undefined as
 * determined by isUndefined(). If the value is undefined then an
 * AssertionError will be thrown.
 *
 * @see {@link isUndefined}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertDefined(x, messagePrefix) {
    if (isUndefined(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be defined`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertDefined' }, assertDefined);
    }
}

/**
 * Asserts that the given value is undefined as
 * determined by isUndefined(). If the value is NOT undefined then an
 * AssertionError will be thrown.
 *
 * @see {@link isUndefined}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertUndefined(x, messagePrefix) {
    if (!isUndefined(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be undefined`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertUndefined' }, assertUndefined);
    }
}

/**
 * Asserts that the given value is a non-empty String as
 * determined by isNonEmptyString(). If the value is not a String, or an empty
 * String then an AssertionError will be thrown.
 *
 * @see {@link isNonEmptyString}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertNonEmptyString(x, messagePrefix) {
    if (!isNonEmptyString(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be a non-empty String`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertNonEmptyString' }, assertNonEmptyString);
    }
}

/**
 * Asserts that the given value is a Number but not NaN as
 * determined by isNumberNotNaN(). If the value is not a Number, or
 * is NaN then an AssertionError will be thrown.
 *
 * @see {@link isNumberNotNaN}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertNumberNotNaN(x, messagePrefix) {
    if (!isNumberNotNaN(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be a Number and not NaN`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertNumberNotNaN' }, assertNumberNotNaN);
    }
}

/**
 * Asserts that the given value is an Array as
 * determined by Array.isArray(). If the value is not an Array
 * then an AssertionError will be thrown.
 *
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertArray(x, messagePrefix) {
    if (!Array.isArray(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be an Array`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertArray' }, assertArray);
    }
}

/**
 * Asserts that the given value is a Boolean as
 * determined by isBoolean(). If the value is not a Boolean
 * then an AssertionError will be thrown.
 *
 * @see {@link isBoolean}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertBoolean(x, messagePrefix) {
    if (!isBoolean(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be a Boolean`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertBoolean' }, assertBoolean);
    }
}

/**
 * Asserts that the given value is a Function as
 * determined by isFunction(). If the value is not a Function
 * then an AssertionError will be thrown.
 *
 * @see {@link isFunction}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertFunction(x, messagePrefix) {
    if (!isFunction(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be a Function`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertFunction' }, assertFunction);
    }
}

/**
 * Asserts that the given value is a valid Date as
 * determined by isValidDate(). If the value is not a valid Date
 * then an AssertionError will be thrown.
 *
 * @see {@link isValidDate}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertValidDate(x, messagePrefix) {
    if (!isValidDate(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be a valid Date`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertValidDate' }, assertValidDate);
    }
}

/**
 * Asserts that the given value is a RegExp as
 * determined by isRegExp(). If the value is not a RegExp
 * then an AssertionError will be thrown.
 *
 * @see {@link isRegExp}
 * @param {*} x
 * @param {string} [messagePrefix] An optional error message prefix string.
 * @throws {AssertionError}
 */
export function assertRegExp(x, messagePrefix) {
    if (!isRegExp(x)) {
        const assertionMessage = `Expected ${ toFriendlyString(x) } to be a RegExp`;

        const message = isNonEmptyString(messagePrefix)
            ? `${ messagePrefix } (${ assertionMessage })`
            : assertionMessage;

        throw new AssertionError(message, { operator: 'assertRegExp' }, assertRegExp);
    }
}

/**
 * Asserts that the subject value is greater than the control value.
 * If the subject is less than or equal to the control value, then an
 * AssertionError will be thrown.
 *
 * @param {number} control The value to test against
 * @param {number} subject The value to test
 * @param {string} [messageSuffix] An optional error message suffix string
 * @throws {AssertionError}
 */
export const assertGreaterThan = curryAssertion2('assertGreaterThan', (control, subject, messageSuffix) => {
    if (subject <= control) {
        const assertionMessage = `Expected ${ toFriendlyString(subject) } to be greater than ${ toFriendlyString(control) }`;
        return isNonEmptyString(messageSuffix)
            ? `${ assertionMessage } (${ messageSuffix })`
            : assertionMessage;
    }
    return null;
});

/**
 * Asserts that the subject value is less than the control value.
 * If the subject is greater than or equal to the control value, then an
 * AssertionError will be thrown.
 *
 * @param {number} control The value to test against
 * @param {number} subject The value to test
 * @param {string} [messageSuffix] An optional error message suffix string
 * @throws {AssertionError}
 */
export const assertLessThan = curryAssertion2('assertLessThan', (control, subject, messageSuffix) => {
    if (subject >= control) {
        const assertionMessage = `Expected ${ toFriendlyString(subject) } to be less than ${ toFriendlyString(control) }`;
        return isNonEmptyString(messageSuffix)
            ? `${ assertionMessage } (${ messageSuffix })`
            : assertionMessage;
    }
    return null;
});
