Kixx Assert
===========
A functional assertion library for ECMAScript.

## Installation

### In the browser:
Include in your HTML:
```html
<script src="./kixx-assert.js" type="text/javascript"></script>
```

Then use in your JavaScript:
```js
var kixxAssert = window.kixxAssert;
```

__AMD and Browserify__ are also supported.

### Node.js
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


Copyright and License
---------------------
Copyright: (c) 2017 by Kris Walker (www.kixx.name)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
