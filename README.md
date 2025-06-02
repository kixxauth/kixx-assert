Kixx Assert
===========
A JavaScript library for creating robust ES6 code.

Contains test functions like `isNumberNotNaN()` which return Booleans, and assertion functions like `assertEquals()` which throw an AssertionError if the condition(s) fail.

Created by [Kris Walker](https://www.kriswalker.me) 2017 - 2025.

## Environment Support

| Env     | Version    |
|---------|------------|
| ECMA    | >= ES2022  |
| Node.js | >= 16.13.2 |
| Deno    | >= 1.0.0   |

This library is designed for use in an ES6 module environment requiring __Node.js >= 16.13.2__ or __Deno >= 1.0.0__. You could use it in a browser, but there are no plans to offer CommonJS or AMD modules. It targets at least [ES2022](https://node.green/#ES2022) and uses the optional chaining operator `?.`.

If you're curious: Node.js >= 16.13.2 is required for [ES6 module stabilization](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#modules-ecmascript-modules) and [ES2022 support](https://node.green/#ES2020).

Please don't bother running benchmarks on this library. Correctness and readability are design objectives. Conserving CPU cycles is not. It is very unlikely any utilities in this library would have a measureable performance impact on your application, and if they did you should probably be implementing something more optimized to your specific use case.

__Note:__ There is no TypeScript here. It would be waste of time for a library as small as this.

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

## Contents

- [Library](#library)
- [Assertions](#assertions)

## Library

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
doesMatch(/^foo/i, 'BAR') // false
doesMatch(/^foo/i, 'FOOBAR') // true
doesMatch('oba', 'foobar') // true
doesMatch('fox', 'The quick brown fox jumped over the...') // true
```

You can curry it!

```js
const isShortDateString = doesMatch(/^[\d]{4}-[\d]{2}-[\d]{2}$/);

isShortDateString('14 September 2020') // false
isShortDateString('2020-09-14') // true
```

### includes
Can be curried.

```js
includes(1, [ 0, 5, 9]) // false
includes('x', 'foobar') // false
includes(9, [ 0, 5, 9]) // true
includes('oba', 'foobar') // true

// Objects look at values, not keys. To check the key use has() or hasOwn().
includes('hello', { hello: 'world' }) // false
includes('world', { hello: 'world' }) // true

// Check the values of a Map or Set
includes(8, new Map([[ 'eight', 8 ]])) // true
includes('hello', new Set([ 'hello' ])) // true
includes('hello', new WeakSet([ 'hello' ])) // true

// Because of the way WeakMaps work, include() is only able
// to look at the keys. You probably should *not* use it this way.
includes(8, new WeakMap([[ 'eight', 8 ]])) // false
includes('eight', new WeakMap([[ 'eight', 8 ]])) // false
```

You can curry it!

```js
includesEmptyString = includes('');

includesEmptyString([ 'foo', 'bar' ]) // false
includesEmptyString([ 'foo', '', 'bar' ]) // true
```

## Assertions

### AssertionError
```js
// In Deno
import { AssertionErrors } from 'https://raw.githubusercontent.com/kixxauth/kixx-assert/2.0.0/mod.js';
// In Node.js:
import { AssertionErrors } from 'kixx-assert';

// Use for situations like this:

try {
    assert(false);
} catch (error) {
    if (error instanceof AssertionError === false) {
        console.log('Threw an unexpected error:', error.constructor.name);
    }
}
```

### assert
Throw an AssertionError if the passed value is not truthy.

```js
assert(0) // Throws AssertionError
assert('foo') // Passes
```

### assertFalsy
Throw an AssertionError if the passed value is not falsy.

```js
assertFalsy('foo') // Throws AssertionError
assertFalsy(null) // Passes
```

### assertEqual
Throw an AssertionError if the passed values are *not strictly* equal. Dates and NaN are special cases handled seperately.

See [isEqual](#isequal).

Can be curried.

```js
assertEqual(1, 2) // Throws AssertionError
assertEqual(1, '1') // Throws AssertionError
assertEqual(1, 1) // passes

// If you do NaN === NaN you'll get false (dumb).
// assertEqual() corrects that behavior.
assertEqual(NaN, NaN) // passes

// Compare dates :D
assertEqual(new Date('1999'), new Date('1999')) // passes
```

You can curry it!

```js
const assertIs1 = assertEqual(1);

assertIs1(1) // passes
```

### assertNotEqual
The inverse of [assertEqual()](#assertequal)

### assertMatches
See [doesMatch()](#doesmatch)

Can be curried.

```js
assertMatches(/^foo/i, 'BAR') // Throws AssertionError
assertMatches(/^foo/i, 'FOOBAR') // passes
assertMatches('oba', 'foobar') // passes
assertMatches('fox', 'The quick brown fox jumped over the...') // passes
```

You can curry it!

```js
const assertShortDateString = assertMatches(/^[\d]{4}-[\d]{2}-[\d]{2}$/);

assertShortDateString('14 September 2020') // Throws AssertionError
assertShortDateString('2020-09-14') // passes
```

### assertNotMatches
The inverse of [assertMatches()](#assertmatches)

### assertEmpty
See [isEmpty()](#isempty)

```js
assertEmpty([1]) // Throws AssertionError
assertEmpty([]) // passes
assertEmpty({ foo: 'bar' }) // Throws AssertionError
assertEmpty({}) // passes
assertEmpty(new Map()) // passes
assertEmpty('hello world') // passes
assertEmpty('') // passes
assertEmpty(null) // passes
assertEmpty(undefined) // passes
assertEmpty(false) // passes
assertEmpty(0) // passes
```

### assertNotEmpty
The inverse of [assertEmpty()](#assertempty)

### assertDefined
Uses [isUndefined()](#isundefined) internally.

```js
assertDefined(undefined) // Throws AssertionError
assertDefined(new Date().foo) // Throws AssertionError
assertDefined(new Map().size) // passes (even though .size is zero)
assertDefined(null) // passes
```

### assertUndefined
Inverse of [assertUndefined](#assertUndefined). Uses [isUndefined()](#isundefined) internally.

```js
assertUndefined(null) // Throws AssertionError
assertUndefined(({}).toString) // Throws AssertionError
assertUndefined(undefined) // passes
```

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


Copyright and License
---------------------
Copyright: (c) 2017 - 2025 by Kris Walker (www.kriswalker.me)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
