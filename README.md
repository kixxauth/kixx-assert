Kixx Assert
===========
A functional assertion library for ECMAScript.

## Installation

### In the browser:

```html
<script src="./kixx-assert.js" type="text/javascript"></script>
```

```js
var kixxAssert = window.kixxAssert;
```

__AMD and Browserify__ are both supported.

### Node.js

```
$ npm install --save kixx-assert
```

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
