Kixx Assert
===========
A functional assertion library for ECMAScript.

## Install in the browser:
__AMD__ and __Browserify__ are supported. Or include in your HTML:

```html
<script src="./kixx-assert.js" type="text/javascript"></script>
```

Then use in your JavaScript:
```js
var KixxAssert = window.KixxAssert;
```

## Install in a Node.js project:
Install with NPM on the command line:
```
$ npm install --save kixx-assert
```

Then use in your project:
```js
const KixxAssert = require('kixx-assert');
```

## API

__Errors__

- [AssertionError](#assertionerror)

__Assertions__

- [isOk(subject, reason)](#assertionsisok)
- [isNotOk(subject, reason)](#assertionsisnotok)
- [isEqual(expected, actual, reason)](#assertionsisequal)
- [isNotEqual(expected, actual, reason)](#assertionsisnotequal)
- [isMatch(pattern, actual, reason)](#assertionsismatch)
- [isNotMatch(pattern, actual, reason)](#assertionsisnotmatch)
- [isUndefined(subject, reason)](#assertionsisundefined)
- [isDefined(subject, reason)](#assertionsisdefined)
- [isEmpty(subject, reason)](#assertionsisempty)
- [isNotEmpty(subject, reason)](#assertionsisnotempty)
- [includes(item, subject, reason)](#assertionsincludes)
- [doesNotInclude(item, subject, reason)](#assertionsdoesnotinclude)
- [has(key, subject, reason)](#assertionshas)
- [doesNotHave(key, subject, reason)](#assertionsdoesnothave)
- [isGreaterThan(a, b, reason)](#assertionsisgreaterthan)
- [isLessThan(a, b, reason)](#assertionsislessthan)
- [isNonEmptyString(subject, reason)](#assertionsisnonemptystring)
- [isNumberNotNaN(subject, reason)](#assertionsisnumbernotnan)

__helpers__

- [identity(x)](#helpersidentity)
- [complement(f)](#helperscomplement)
- [type(v)](#helperstype)
- [keys(x)](#helperskeys)
- [has(prop, x)](#helpershas)
- [equal(a, b)](#helpersequal)
- [greaterThan(a, b)](#helpersgreaterthan)
- [match(matcher, x)](#helpersmatch)
- [isPrimitive(x)](#helpersisprimitive)
- [isString(x)](#helpersisstring)
- [isNumber(x)](#helpersisnumber)
- [isBoolean(x)](#helpersisboolean)
- [isArray(x)](#helpersisarray)
- [isObject(x)](#helpersisobject)
- [isFunction(x)](#helpersisfunction)
- [isNull(x)](#helpersisnull)
- [isUndefined(x)](#helpersisundefined)
- [isDefined(x)](#helpersisdefined)
- [isNumberNotNaN(x)](#helpersisnumbernotnan)
- [isNonEmptyString(x)](#helpersisnonemptystring)
- [isEmpty(x)](#helpersisemtpty)
- [isNotEmpty(x)](#helpersisnotemtpty)
- [includes(item, list)](#helpersincludes)
- [doesNotInclude(item, list)](#helpersdoesnotinclude)
- [toString(item, list)](#helperstostring)
- [printf(pattern, ..rest)](#helpersprintf)
- [assertion1(guard, reason)](#helpersassertion1)
- [assertion2(guard, reason)](#helpersassertion2)


### AssertionError
An Error constructor used to identify assertion errors. Passing in a caller can help isolate stack traces to make them more usable.

```js
// Example:
function myFunction() {
    throw new KixxAssert.AssertionError('test error', null, myFunction);
}
```

```js
// Implementation:
function AssertionError (message, props, caller) {
    this.message = message || 'Unspecified AssertionError';
    caller = caller || AssertionError;
    Error.captureStackTrace(this, caller);
}

AssertionError.prototype = Object.create(Error.prototype);

AssertionError.prototype.name = 'AssertionError';

AssertionError.prototype.constructor = AssertionError;
```


### assertions.isOk
__`KixxAssert.assertions.isOk(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isNotOk
__`KixxAssert.assertions.isNotOk(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isEqual
__`KixxAssert.assertions.isEqual(expected, actual, reason)`__

parameter | type | description
--------- | ---- | -----------
expected | any | The value to test against
actual | any | The test subject
reason | String | String used as the first part of the AssertionError message.

### assertions.isNotEqual
__`KixxAssert.assertions.isNotEqual(expected, actual, reason)`__

parameter | type | description
--------- | ---- | -----------
expected | any | The value to test against
actual | any | The test subject
reason | String | String used as the first part of the AssertionError message

### assertions.isMatch
__`KixxAssert.assertions.isMatch(pattern, actual, reason)`__

parameter | type | description
--------- | ---- | -----------
pattern | String or RegExp | The pattern to test
actual | any | The test subject
reason | String | String used as the first part of the AssertionError message

### assertions.isNotMatch
__`KixxAssert.assertions.isNotMatch(pattern, actual, reason)`__

parameter | type | description
--------- | ---- | -----------
pattern | String or RegExp | The pattern to test
actual | any | The test subject
reason | String | String used as the first part of the AssertionError message

### assertions.isUndefined
__`KixxAssert.assertions.isUndefined(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isDefined
__`KixxAssert.assertions.isDefined(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isEmpty
__`KixxAssert.assertions.isEmpty(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isNotEmpty
__`KixxAssert.assertions.isNotEmpty(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.includes
__`KixxAssert.assertions.includes(item, subject, reason)`__

parameter | type | description
--------- | ---- | -----------
item | any | The item expected to be found in the subject
subject | Array, Object, or String | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.doesNotInclude
__`KixxAssert.assertions.doesNotInclude(item, subject, reason)`__

parameter | type | description
--------- | ---- | -----------
item | any | The item *not* expected to be found in the subject
subject | Array, Object, or String | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.has
__`KixxAssert.assertions.has(key, subject, reason)`__

parameter | type | description
--------- | ---- | -----------
key | String | The name of the object property to test for
subject | Object | The Object to test
reason | String | String used as the first part of the AssertionError message.

### assertions.doesNotHave
__`KixxAssert.assertions.doesNotHave(key, subject, reason)`__

parameter | type | description
--------- | ---- | -----------
key | String | The name of the object property to test for
subject | Object | The Object to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isGreaterThan
__`KixxAssert.assertions.isGreaterThan(a, b, reason)`__

parameter | type | description
--------- | ---- | -----------
a | any | The control value
b | any | The tested value
reason | String | String used as the first part of the AssertionError message.

Assertion will pass if `b` is greater than `a`.

### assertions.isLessThan
__`KixxAssert.assertions.isLessThan(a, b, reason)`__

parameter | type | description
--------- | ---- | -----------
a | any | The control value
b | any | The tested value
reason | String | String used as the first part of the AssertionError message.

Assertion will pass if `b` is less than `a`.

### assertions.isNonEmptyString
__`KixxAssert.assertions.isNonEmptyString(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### assertions.isNumberNotNaN
__`KixxAssert.assertions.isNumberNotNaN(subject, reason)`__

parameter | type | description
--------- | ---- | -----------
subject | any | The item to test
reason | String | String used as the first part of the AssertionError message.

### helpers.identity
__`KixxAssert.helpers.identity(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | The value to return

__Returns__ the input value `x`.

A function that does nothing but return the parameter supplied to it. Good as a default or placeholder function.

### helpers.complement
__`KixxAssert.helpers.complement(f)`__

parameter | type | description
--------- | ---- | -----------
f | Function | The the Function to invert

__Returns__ a new Function which will call `f`.

Takes a function f and returns a function g such that if called with the same arguments when f returns a "truthy" value, g returns false and when f returns a "falsy" value g returns true.

### helpers.type
__`KixxAssert.helpers.type(v)`__

parameter | type | description
--------- | ---- | -----------
v | any | The value to test

__Returns__ a String representing the type of the value.

Gives a single-word string description of the (native) type of a value, returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not attempt to distinguish user Object types any further, reporting them all as 'Object'.

### helpers.keys
__`KixxAssert.helpers.keys(x)`__

parameter | type | description
--------- | ---- | -----------
x | Object | The object to extract property keys from

__Returns__ an Array of the object's own enumerable property names.

Returns a list containing the names of all the enumerable own properties of the supplied object. Note that the order of the output array is not guaranteed to be consistent across different JS platforms.

### helpers.has
__`KixxAssert.helpers.has(prop, x)`__

parameter | type | description
--------- | ---- | -----------
prop | String | The name of the property to check for
x | Object | The object to to check

__Returns__ a Boolean indicating if the property exists.

Returns whether or not an object has an own property with the specified name.

### helpers.equal
__`KixxAssert.helpers.equal(a, b)`__

parameter | type | description
--------- | ---- | -----------
a | any | Thing 1
b | any | Thing 2

__Returns__ a Boolean indicating if `a` and `b` are strict equal.

Determine if both arguments are strict equal (`===`).

### helpers.greaterThan
__`KixxAssert.helpers.greaterThan(a, b)`__

parameter | type | description
--------- | ---- | -----------
a | any | Thing 1
b | any | Thing 2

__Returns__ a Boolean indicating if `b` is greater than (`>`) `a`.

Deterimine if the second argument is greater than the first.

### helpers.lessThan
__`KixxAssert.helpers.lessThan(a, b)`__

parameter | type | description
--------- | ---- | -----------
a | any | Thing 1
b | any | Thing 2

__Returns__ a Boolean indicating if `b` is less than (`<`) `a`.

Deterimine if the second argument is less than the first.

### helpers.match
__`KixxAssert.helpers.match(matcher, x)`__

parameter | type | description
--------- | ---- | -----------
matcher | RegExp or String | Regular expression or String to match against
x | String | String to match

__Returns__ a Boolean indicating if `x` matches `matcher`.

Determine if the second argument matches the first using a RegExp or String match. If the first argument is a String the second argument will be matched against it using `===`. Otherwise the first argument is assumed to be a RegExp and will be matched using `.test()`.

### helpers.isPrimitive
__`KixxAssert.helpers.isPrimitive(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is not an Object or is null.

Indicate if the argument is not an object, or is null.

### helpers.isString
__`KixxAssert.helpers.isString(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is a String.

Indicate if the argument is a String.

### helpers.isNumber
__`KixxAssert.helpers.isNumber(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is a number.

Indicate if the argument is a number or NaN.

### helpers.isBoolean
__`KixxAssert.helpers.isBoolean(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is a Boolean.

Indicate if the argument is a Boolean.

### helpers.isArray
__`KixxAssert.helpers.isArray(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is an Array.

Indicate if the argument is an Array.

### helpers.isObject
__`KixxAssert.helpers.isObject(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is a plain Object.

Indicate if the argument is a plain Object. It will return false for Dates, RegExp, Arrays, etc.

### helpers.isFunction
__`KixxAssert.helpers.isFunction(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is a Function.

Indicate if the argument is a Function.

### helpers.isNull
__`KixxAssert.helpers.isNull(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is `null`.

Indicate if the argument is `null`. It will return `false` for `undefined`.

### helpers.isUndefined
__`KixxAssert.helpers.isUndefined(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is not defined.

Indicate if the argument is not defined using `typeof x === 'undefined'`.

### helpers.isDefined
__`KixxAssert.helpers.isDefined(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating if `x` is defined.

Indicate if the argument is anything other than `undefined`, even `null`.

### helpers.isNumberNotNaN
__`KixxAssert.helpers.isNumberNotNaN(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating that `x` is a Number but not NaN.

Indicate if the first argument is a Number, but not NaN.

### helpers.isNonEmptyString
__`KixxAssert.helpers.isNonEmptyString(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating that `x` is a String with length greater than 0.

Indicate if the first argument is a String with length greater than zero.

### helpers.isEmpty
__`KixxAssert.helpers.isEmpty(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating that `x` has its type's empty value.

Returns Boolean `true` if the first argument is an empty Array, String, or Object with no enumerable properties. Returns Boolean `true` for all primitives which are falsy and Boolean `false` for all primitives which are truthy.

### helpers.isNotEmpty
__`KixxAssert.helpers.isNotEmpty(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | Thing to check

__Returns__ a Boolean indicating that `x` does *not* have its type's empty value.

Returns Boolean `true` if the first argument is an empty Array, String, or Object with more than zero enumerable properties. Returns Boolean `true` for all primitives which are truthy and Boolean `false` for all primitives which are falsy.

### helpers.includes
__`KixxAssert.helpers.includes(item, list)`__

parameter | type | description
--------- | ---- | -----------
item | any | Thing to check
list | Array, String, or Object | List to check

__Returns__ a Boolean indicating that `item` was found in `list` using the `===` comparator.

Returns Boolean true if the second argument is an Array, String, or Object which contains the first argument. In the case of a String, the first argument must be a character contained in the second argument to return true. In the case of an Array, any primitive or object which compares with `===` will return true. In the case of an Object, any primitive or object which is an enumerable property of the Object and compares wth `===` will return true.

### helpers.doesNotInclude
__`KixxAssert.helpers.doesNotInclude(item, list)`__

parameter | type | description
--------- | ---- | -----------
item | any | Thing to check
list | Array, String, or Object | List to check

__Returns__ a Boolean indicating that `item` was *not* found in `list` using the `===` comparator.

Returns Boolean true if the second argument is an Array, String, or Object which does *not* contain the first argument. In the case of a String, the first argument must be a character which is *not* contained in the second argument to return `true`. In the case of an Array, any primitive or object which compares with `===` will return `false`. In the case of an Object, any primitive or object which is an enumerable property of the Object and compares wth `===` will return `false`.

### helpers.toString
__`KixxAssert.helpers.toString(x)`__

parameter | type | description
--------- | ---- | -----------
x | any | The thing to stringify

__Returns__ a String representation of `x`.

```js
console.log(helpers.toString('foo')); // String("foo")
console.log(helpers.toString(true)); // Boolean(true)
console.log(helpers.toString(99)); // Number(99)
console.log(helpers.toString()); // undefined
console.log(helpers.toString(null)); // null
console.log({}); // Object({})
console.log(Object.create(null)); // [object Object]
console.log(new Cat()); // Cat({})
```

### helpers.printf
__`KixxAssert.helpers.printf(pattern, ...rest)`__

parameter | type | description
--------- | ---- | -----------
pattern | String | The pattern string using %d, %s, %x as placeholders for `...rest`
rest | any additional arguments | Any objects to replace in pattern String

__Returns__ a String.

If the first argument is a string with replacement patterns (starting with "%") then the following arguments are stringified and replaced. If the first argument is a string with no replacement patterns it will be returned alone. If the first argument is not a string, then all arguments will simply be stringified, separated by spaces.

```js
console.log(heleprs.printf('foo')); // foo
console.log(helpers.printf('foo %d %x'), 1, null); // foo Number(1) null
console.log(helpers.printf({foo: 'bar'}, 1, null)); // Object({}) Number(1) null
```

### helpers.assertion1
__`KixxAssert.helpers.assertion1(guard, reason)`__

parameter | type | description
--------- | ---- | -----------
guard | Function | A Function which will be called with the assertion argument as the assertion test and is expected to return a Boolean.
reason | Function | A Function wich will be called with the assertion argument in the case of failure and is expected to return a String.

__Returns__ a composed assertion Function.

The returned assertion Function will through an AssertionError if the call to the `guard()` returns `false`.

```js
const isEmpty = assertion1(isEmpty, function (actual) {
    return printf('expected %x to be empty', actual);
});

isEmpty([1], 'Is it empty?'); // Will throw AssertionError
```

### helpers.assertion2
__`KixxAssert.helpers.assertion1(guard, reason)`__

parameter | type | description
--------- | ---- | -----------
guard | Function | A Function which will be called with the assertion arguments as the assertion test and is expected to return a Boolean.
reason | Function | A Function wich will be called with the assertion arguments in the case of failure and is expected to return a String.

__Returns__ a composed assertion Function.

The returned assertion Function will throw an AssertionError if the call to the `guard()` returns `false`. If the returned assertion function is called with only 1 argument, it will automatically curry, returning a function which will accept the remaining 2 arguments.

```js
const isEqual = assertion2(helpers.equal, function (expected, actual) {
    return printf('expected %x to equal %x', actual, expected);
});

const isEqualToFoo = isEqual('foo');

isEqualToFoo('bar', 'is it equal to "foo"?'); // Will throw AssertionError
```


Copyright and License
---------------------
Copyright: (c) 2017 by Kris Walker (www.kixx.name)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
