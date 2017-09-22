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
var kixxAssert = window.kixxAssert;
```

## Install in a Node.js project:
Install with NPM on the command line:
```
$ npm install --save kixx-assert
```

Then use in your project:
```js
const kixxAssert = require('kixx-assert');
```

## API

### AssertionError
An Error constructor used to identify assertion errors. Passing in a caller can help isolate stack traces to make them more usable.

```js
// Example:
function myFunction() {
    throw new kixxAssert.AssertionError('test error', null, myFunction);
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

### Helpers

#### identity
A function that does nothing but return the parameter supplied to it. Good as a default or placeholder function.

name | type | description
---- | ---- | -----------
x | any | The value to return

__Returns__ the input value `x`.


#### complement
Returns the Boolean inverse of the first argument passed into it.

#### type
Returns an identifying type string of the first argument passed into it.

#### keys
Returns the key strings of the enumerable keys of an Object hash passed into it.

#### has
Determine if an Object hash has an enumerable key by the given name.

#### equal
Returns Boolean true if both arguments are strict equal (`===`). Returns Boolean false if not.

#### greaterThan
Returns Boolean true if the first argument is greater than the second. Returns Boolean false if not.

#### lessThan
Returns Boolean true if the first argument is less than the second. Returns Boolean false if not.

#### match
Returns Boolean true if the second argument matches the first RegExp or String. Returns Boolean false if not.

#### isPrimitive
Returns Boolean true if the first argument is not an object, or is null.

#### isString

#### isNumber

#### isBoolean

#### isArray

#### isObject

#### isFunction

#### isNull

#### isUndefined

#### isDefined

#### isNumberNotNaN
Returns Boolean true if the first argument is a Number, but not NaN.

#### isNonEmptyString
Return Boolean true if the first argument is a String with length greater than zero.

#### isEmpty
Returns Boolean true if the first argument is an empty Array, String, or Object with no enumerable properties. Returns Boolean true for all primitives which are truthy and Boolean false for all primitives which are falsy.

#### isNotEmpty

#### includes
Returns Boolean true if the second argument is an Array, String, or Object which contains the first argument. In the case of a String, the first argument must be a character contained in the second argument to return true. In the case of an Array, any primitive or object which compares with `===` will return true. In the case of an Object, any primitive or object which is an enumerable property of the Object and compares wth `===` will return true.

#### doesNotInclude

#### toString
A special stringification function.

```js
console.log(helpers.toString('foo')); // String("foo")
console.log(helpers.toString(true)); // Boolean(true)
```

#### printf
If the first argument is a string with replacement patterns (starting with "%") then the following arguments are stringified and replaced. If the first argument is a string with no replacement patterns it will be returned alone. If the first argument is not a string, then all arguments will simply be stringified, separated by spaces.

```js
console.log(heleprs.printf('foo')); // foo
console.log(helpers.printf('foo %d %x'), 1, null); // foo Number(1) null
console.log(helpers.printf({foo: 'bar'}, 1, null)); // Object({}) Number(1) null
```

#### assertion1

#### assertion2

### Assertions

#### isOk

#### isNotOk

#### isEqual

#### isNotEqual

#### isMatch

#### isNotMatch

#### isUndefined

#### isDefined

#### isEmpty

#### isNotEmpty

#### includes

#### doesNotInclude

#### has

#### doesNotHave

#### isGreaterThan

#### isLessThan

#### isNonEmptyString

#### isNumberNotNaN


Copyright and License
---------------------
Copyright: (c) 2017 by Kris Walker (www.kixx.name)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
