Kixx Assert
===========
Assert things in JavaScript. Use the assertion functions for testing, or the helper functions to avoid problems like this:

```js
// Typos when type checking.
if (typeof myImportantParameter !== 'funcion') {
    throw TypeError('Invalid parameter');
}

if (myImportantParameter && typeof myImportantParameter === 'string') {
    doStringThing(myImportantParameter);
}

// Replace the above with:
if (isNonEmptyString(myImportantParameter)) {
    doStringThing(myImportantParameter);
}
```

Created by [Kris Walker](https://www.kriswalker.me) 2017 - 2023.

This library is designed for use in Node.js >= 12.0.0 or any version of Deno.js. You could use it in a browser, but there are no plans to offer CommonJS or AMD modules.

Please don't bother running benchmarks on this library. Correctness and readability are design objectives. Conserving CPU cycles is not.

There is no TypeScript stuff here. It would be confusing and a massive waste of time for a library like this.

## Usage
```js
// In Deno
import { isString, assertEquals } from 'https://raw.githubusercontent.com/kixxauth/kixx-assert/2.0.0/mod.js';
// In Node.js:
import { isString, assertEquals } from 'kixx-assert';

assertEquals(true, isString('hello world'));
assertEquals(false, isString({}));
```

Also supports currying :tada:

```js
const assertTrue = assertEqual(true);
const assertFalse = assertEqual(false);

assertTrue(isString('hello world'));
assertFalse(isString({}));
```

### isString
```js
isString(1) // false
isString('1') // true
isString(String('1')) // true

// If you need to do this for some (dumb) reason, then isString() will still
// return true even though typeof new String() === 'object'.
isString(new String('1')) // true
````

### isNonEmptyString
```js
isNonEmptyString(1) // false
isNonEmptyString('') // false
isNonEmptyString('hello world') // true
```

Uses [isString()](#isstring) internally.

### isNumber
```js
isNumber('2') // false
isNumber(1) // true
isNumber(0.1) // true
isNumber(BigInt(7)) // true
isNumber(NaN) // true
```
Detects integers, floats, BigInt, and even NaN.

See [isNumberNotNaN()](#isnumbernotnan) below for something which might be more useful for you.

### isNumberNotNaN
```js
isNumberNotNaN('2') // false
isNumberNotNaN(NaN) // false
isNumberNotNaN(1) // true
isNumberNotNaN(0.1) // true
isNumberNotNaN(BigInt(7)) // true
```

Uses [isNumber()](#isnumber) internally.

### isBoolean
```js
isBoolean(1) // false
isBoolean(false) // true
isBoolean(Boolean(1)) // true

// If you need to do this for some (stupid) reason, then isBoolean() will still
// return true even though typeof new Boolean() === 'object'.
isBoolean(new Boolean(1)) // true
```

### isSymbol
```js
isSymbol('keyname') // false
isSymbol(Symbol('keyname')) // true
```

### isBigInt
```js
isBigInt(1) // false
isBigInt(BigInt(1)) // true
```

### isUndefined
```js
isUndefined(null) // false
isUndefined(undefined) // true
isUndefined() // true
```

### isPrimitive
Detects [JavaScript Primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

```js
isPrimitive({}) // false
isPrimitive(null) // true
isPrimitive(false) // true
isPrimitive('hello world') // true
isPrimitive(undefined) // true
isPrimitive() // true
```

### isFunction
Detects function declaration, function expressions, arrow functions, and async functions.

```js
class Foo {
    yell() {
        return 'HELLO WORLD';
    }
}

async function helloWorld() {
    const res = await Promise.resolve('hello world');
    return res;
}

isFunction('foo') // false
isFunction(() => {}) // true
isFunction(helloWorld) // true
isFunction(new Foo().yell) // true
```

### isPlainObject
```js
isPlainObject(new Date()) // false
isPlainObject({ foo: 'bar' }) // true
```

### isDate
```js
isDate({}) // false
isDate(new Date()) // true
```

### isValidDate
```js
isValidDate({}) // false
isValidDate(new Date('1999')) // true
isValidDate(new Date('Invalid')) // false
```

### isRegExp
```js
isRegExp({}) // false
isRegExp(/^foo/i) // true
isRegExp(new RegExp('^foo', 'i')) // true
```

### isMap
```js
isMap(new Set()) // false
isMap(new Map()) // true
isMap(new WeakMap()) // true
```

### isSet
```js
isSet(new Map()) // false
isSet(new Set()) // true
isSet(new WeakSet()) // true
```

### has
Can be curried.

```js
class Widget {

    prop = 1;

    constructor() {
        Object.defineProperties(this, {
            obvious: {
                enumerable: true,
                value: 2,
            },
            needToKnow: {
                enumerable: false,
                value: 3,
            },
        });
    }

    get bar() {
        return 4;
    }

    start() {
        return null;
    }

    static create() {
        return new Widget();
    }
}

const widget = new Widget();

has('prop', widget) // true
has('obvious', widget) // true
has('needToKnow', widget) // true
has('bar', widget) // true
has('start', widget) // true

// Class method
has('create', Widget) // true

// Does not exist
has('foo', widget);
```

You can curry it!

```js
const hasStart = has('start');

hasStart(widget) // true
```

### hasOwn
Can be curried.

```js
class Widget {

    prop = 1;

    constructor() {
        Object.defineProperties(this, {
            obvious: {
                enumerable: true,
                value: 2,
            },
            needToKnow: {
                enumerable: false,
                value: 3,
            },
        });
    }

    get bar() {
        return 4;
    }

    start() {
        return null;
    }

    static create() {
        return new Widget();
    }
}

const widget = new Widget();

hasOwn('prop', widget) // true
hasOwn('obvious', widget) // true
hasOwn('needToKnow', widget) // true
hasOwn('bar', widget) // false
hasOwn('start', widget) // false

// Class method
hasOwn('create', Widget) // true
```

You can curry it!

```js
const hasObvious = has('obvious');

hasObvious(widget) // true
```

### ownKeys
```js
Object.keys(null) // Error!

ownKeys(null) // []
ownKeys({ foo: 'bar' }) // [ "foo" ]
```

### isEmpty
```js
isEmpty([1]) // false
isEmpty([]) // true
isEmpty({ foo: 'bar' }) // false
isEmpty({}) // true
isEmpty(new Map()) // true
isEmpty(new Set()) // true
isEmpty(new Map([['foo', 1]])) // false
isEmpty(new Set([1])) // false
isEmpty('hello world') // false
isEmpty('') // true
isEmpty(new Date()) // false
isEmpty(new Date('Invalid')) // false
isEmpty(null) // true
isEmpty(undefined) // true
isEmpty() // true
isEmpty(false) // true
isEmpty(true) // false
isEmpty(0) // true
isEmpty(1) // false
```

### isEqual
Provides a clever date comparison and some safety against stupid stuff with NaN.

Can be curried.

```js
isEqual(1, 2) // false
isEqual(1, '1') // false
isEqual(1, 1) // true

// If you do NaN === NaN you'll get false (dumb).
// The isEqual() helper corrects that.
isEqual(NaN, NaN) // true

// Compare dates :D
isEqual(new Date('1999'), new Date('1999')) // true
```

You can curry it!

```js
const isOne = isEqual(1);

isOne(1) // true
```

### doesMatch
A wiz at matching strings and RegExp, but can match just about anything.

Can be curried.

```js
```

You can curry it!

```js
```

export function doesMatch(matcher, x) {
    if (arguments.length < 2) {
        return function curriedDoesMatch(_x) {
            return doesMatch(matcher, _x);
        };
    }
    if (isEqual(matcher, x)) {
        return true;
    }
    if (typeof matcher?.test === 'function') {
        return matcher.test(x);
    }
    if (typeof x?.includes === 'function') {
        return x.includes(matcher);
    }

    return false;
}

export function includes(item, list) {
    if (arguments.length < 2) {
        return function curriedIncludes(_list) {
            return includes(item, _list);
        };
    }

    if (Array.isArray(list) || isString(list)) {
        return list.includes(item);
    }

    const tag = protoToString.call(list);

    if (tag === '[object Map]') {
        for (const val of list.values()) {
            if (isEqual(val, item)) {
                return true;
            }
        }
    }
    if (tag === '[object WeakMap]' || tag === '[object Set]' || tag === '[object WeakSet]') {
        return list.has(item);
    }

    for (const key of ownKeys(list)) {
        if (isEqual(list[key], item)) {
            return true;
        }
    }

    return false;
}

export function toFriendlyString(x) {
    if (isString(x)) {
        return 'String("'+ x +'")';
    }
    if (isBigInt(x)) {
        return 'BigInt('+ x +')';
    }
    // WARNING
    // Checking isNumber() will return true for BigInt instances as well as
    // Numbers, so the isBigInt() check needs to come before isNumber().
    if (isNumber(x)) {
        return 'Number('+ x +')';
    }
    if (isBoolean(x)) {
        return 'Boolean('+ x +')';
    }
    if (isSymbol(x)) {
        return x.toString();
    }
    if (isUndefined(x)) {
        return 'undefined';
    }
    if (isFunction(x)) {
        // This will get "Function" or "AsyncFunction":
        const prefix = protoToString.call(x).slice(8, -1);
        if (x.name) {
            return prefix + '('+ x.name +'() {})';
        }
        return prefix + '(function () {})';
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
        return 'Array([0..'+ (x.length - 1) +'])';
    }
    if (isValidDate(x)) {
        return 'Date('+ x.toISOString() +')';
    }
    if (isDate(x)) {
        return 'Date(Invalid)';
    }
    if (isRegExp(x)) {
        return 'RegExp('+ x +')';
    }

    const name = x.constructor?.name || 'Object';

    return name +'('+ x +')';
}

export function curryAssertion1(guard) {
    return function curriedAssertion1(x, message) {
        message = message ? ` ${ message }` : '.';
        const msg = guard(x, message);
        if (msg) {
            throw new AssertionError(msg, null, curriedAssertion1);
        }

        return null;
    };
}

export function curryAssertion2(guard) {
    return function curriedAssertion2(expected, actual, message) {
        if (arguments.length < 2) {
            return function curriedInnerAssert(_actual, _message) {
                _message = _message ? ` ${ _message }` : '.';
                const _msg = guard(expected, _actual, _message);
                if (_msg) {
                    throw new AssertionError(_msg, null, curriedInnerAssert);
                }
            };
        }

        message = message ? ` ${ message }` : '.';
        const msg = guard(expected, actual, message);
        if (msg) {
            throw new AssertionError(msg, null, curriedAssertion2);
        }

        return null;
    };
}

export function assert(x, message) {
    if (!x) {
        const messageSuffix = message ? ` ${ message }` : '.';
        throw new AssertionError(
            `Expected ${ toFriendlyString(x) } to be truthy${ messageSuffix }`,
            null,
            assert
        );
    }
}

export function assertFalsy(x, message) {
    if (x) {
        const messageSuffix = message ? ` ${ message }` : '.';
        throw new AssertionError(
            `Expected ${ toFriendlyString(x) } to be falsy${ messageSuffix }`,
            null,
            assert
        );
    }
}

export const assertEqual = curryAssertion2((expected, actual, messageSuffix) => {
    if (!isEqual(expected, actual)) {
        let msg = `Expected ${ toFriendlyString(actual) }`;
        msg += ` to equal (===) ${ toFriendlyString(expected) }`;
        return msg + messageSuffix;
    }
    return null;
});

export const assertNotEqual = curryAssertion2((expected, actual, messageSuffix) => {
    if (isEqual(expected, actual)) {
        let msg = `Expected ${ toFriendlyString(actual) }`;
        msg += ` to NOT equal (!==) ${ toFriendlyString(expected) }`;
        return msg + messageSuffix;
    }
    return null;
});

export const assertMatches = curryAssertion2((matcher, actual, messageSuffix) => {
    if (!doesMatch(matcher, actual)) {
        const msg = `Expected ${ toFriendlyString(actual) } to match `;
        return msg + toFriendlyString(matcher) + messageSuffix;
    }
    return null;
});

export const assertNotMatches = curryAssertion2((matcher, actual, messageSuffix) => {
    if (doesMatch(matcher, actual)) {
        const msg = `Expected ${ toFriendlyString(actual) } NOT to match `;
        return msg + toFriendlyString(matcher) + messageSuffix;
    }
    return null;
});

export function assertEmpty(x, message) {
    if (!isEmpty(x)) {
        const messageSuffix = message ? ` ${ message }` : '.';
        throw new AssertionError(
            `Expected ${ toFriendlyString(x) } to be empty, null, or NaN${ messageSuffix }`,
            null,
            assertEmpty
        );
    }
}

export function assertNotEmpty(x, message) {
    if (isEmpty(x)) {
        const messageSuffix = message ? ` ${ message }` : '.';
        throw new AssertionError(
            `Expected ${ toFriendlyString(x) } NOT to be empty, null, or NaN${ messageSuffix }`,
            null,
            assertNotEmpty
        );
    }
}

export function assertDefined(x, message) {
    if (isUndefined(x)) {
        const messageSuffix = message ? ` ${ message }` : '.';
        throw new AssertionError(
            `Expected ${ toFriendlyString(x) } to be defined${ messageSuffix }`,
            null,
            assertDefined
        );
    }
}

export function assertUndefined(x, message) {
    if (!isUndefined(x)) {
        const messageSuffix = message ? ` ${ message }` : '.';
        throw new AssertionError(
            `Expected ${ toFriendlyString(x) } to be undefined${ messageSuffix }`,
            null,
            assertUndefined
        );
    }
}

export const assertIncludes = curryAssertion2((item, list, messageSuffix) => {
    if (!includes(item, list)) {
        const msg = `Expected ${ toFriendlyString(list) } to include `;
        return msg + toFriendlyString(item) + messageSuffix;
    }
    return null;
});

export const assertExcludes = curryAssertion2((item, list, messageSuffix) => {
    if (includes(item, list)) {
        const msg = `Expected ${ toFriendlyString(list) } NOT to include `;
        return msg + toFriendlyString(item) + messageSuffix;
    }
    return null;
});

export const assertGreaterThan = curryAssertion2((control, subject, messageSuffix) => {
    if (subject <= control) {
        const msg = `Expected ${ toFriendlyString(subject) } to be greater than `;
        return msg + toFriendlyString(control) + messageSuffix;
    }
    return null;
});

export const assertLessThan = curryAssertion2((control, subject, messageSuffix) => {
    if (subject >= control) {
        const msg = `Expected ${ toFriendlyString(subject) } to be less than `;
        return msg + toFriendlyString(control) + messageSuffix;
    }
    return null;
});

export function assertThrowsError(fn, message) {
    const messageSuffix = message ? ` ${ message }` : '.';

    let didThrow = false;
    try {
        fn();
    } catch (err) {
        didThrow = true;

        if (err instanceof Error === false) {
            let msg = 'Expected function to throw instance of Error';
            msg += ' but instead threw instance of ';
            msg += (err?.constructor?.name || '[not an object]');
            throw new AssertionError(msg + messageSuffix);
        }
    }

    if (!didThrow) {
        throw new AssertionError(`Expected function to throw${ messageSuffix }`);
    }
}

export const assertThrowsErrorMessage = curryAssertion2((messagePart, fn, messageSuffix) => {
    let didThrow = false;
    try {
        fn();
    } catch (err) {
        didThrow = true;

        if (err instanceof Error === false) {
            let msg = 'Expected function to throw instance of Error';
            msg += ' but instead threw instance of ';
            msg += (err?.constructor?.name || '[not an object]');
            return msg + messageSuffix;
        }

        if (!isString(err.message) || !err.message.includes(messagePart)) {
            let msg = 'Expected function to throw error message including part ';
            msg += `"${ messagePart }" but instead threw error message ${ err.message }`;
            return msg + messageSuffix;
        }
    }

    if (!didThrow) {
        return 'Expected function to throw' + messageSuffix;
    }

    return null;
});

export const assertThrowsErrorCode = curryAssertion2((errorCode, fn, messageSuffix) => {
    let didThrow = false;
    try {
        fn();
    } catch (err) {
        didThrow = true;

        if (err instanceof Error === false) {
            let msg = 'Expected function to throw instance of Error';
            msg += ' but instead threw instance of ';
            msg += (err?.constructor?.name || '[not an object]');
            return msg + messageSuffix;
        }

        if (err.code !== errorCode) {
            let msg = 'Expected function to throw error with code ';
            msg += toFriendlyString(errorCode);
            msg += ' but instead threw error with code ';
            msg += toFriendlyString(err.code);
            return msg + messageSuffix;
        }
    }

    if (!didThrow) {
        return 'Expected function to throw' + messageSuffix;
    }

    return null;
});

export const assertThrowsErrorClass = curryAssertion2((errorClass, fn, messageSuffix) => {
    let didThrow = false;
    try {
        fn();
    } catch (err) {
        didThrow = true;

        if (err instanceof errorClass === false) {
            let msg = `Expected function to throw instance of ${ errorClass.name }`;
            msg += ' but instead threw instance of ';
            msg += (err?.constructor?.name || '[not an object]');
            return msg + messageSuffix;
        }
    }

    if (!didThrow) {
        return 'Expected function to throw' + messageSuffix;
    }

    return null;
});


Copyright and License
---------------------
Copyright: (c) 2017 - 2023 by Kris Walker (www.kriswalker.me)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
