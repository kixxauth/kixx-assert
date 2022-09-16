/* globals define, module */
(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['kixx-assert'], factory);
	} else if (typeof module === 'object' && module.exports) {
		factory(module.exports);
	} else {
		root.KixxAssert = {};
		factory(root.KixxAssert);
	}
}(this, function(exports) {
	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var protoSlice = Array.prototype.slice;
	var protoToString = Object.prototype.toString;

	function identity(x) {
		return x;
	}

	function complement(fn) {
		return function () {
			return !fn.apply(this, arguments);
		};
	}

	function curry1(fn) {
		return function f1(a) {
			if (arguments.length < 1) return f1;
			return fn(a);
		};
	}

	function curry2(fn) {
		return function f2(a, b) {
			if (arguments.length < 1) return f2;
			if (arguments.length < 2) return curry1(function(_b) { return fn(a, _b); });
			return fn(a, b);
		};
	}

	function AssertionError (message, props, caller) {
		this.message = message || 'Unspecified AssertionError';
		if (typeof Error.captureStackTrace === 'function') {
			caller = caller || AssertionError;
			Error.captureStackTrace(this, caller);
		}
	}

	AssertionError.prototype = Object.create(Error.prototype);

	AssertionError.prototype.name = 'AssertionError';

	AssertionError.prototype.constructor = AssertionError;

	// Allow errors to be converted to JSON for transfer.
	AssertionError.prototype.toJSON = function () {
		var exclude = ['constructor', 'toJSON', 'stack'];
		var thisKeys = keys(this);
		var props = {};

		for (var i = thisKeys.length - 1; i >= 0; i--) {
			var key = thisKeys[i];
			if (exclude.indexOf(key) === -1) {
				props[key] = this[key];
			}
		}

		props.stack = this.stack;
		props.name = this.name;
		return props;
	};

	function type(x) {
		if (x === null) return 'Null';
		if (typeof x === 'undefined') return 'Undefined';
		return protoToString.call(x).slice(8, -1);
	}

	function keys(x) {
		if (x === null) {
			throw new TypeError('Cannot perform keys() operation on null.');
		}
		if (type(x) !== 'Object') {
			throw new TypeError('Cannot perform keys() operation on a non Object.');
		}

		var list = [];

		for (var key in x) {
			if (hasOwn.call(x, key)) list.push(key);
		}

		return list;
	}

	function has(key, x) {
		return hasOwn.call(x, key);
	}

	function equal(a, b) {
		if (a === b) {
			// Make sure 0 !== -0.
			return a !== 0 || 1 / a === 1 / b;
		} else {
			// Make sure NaN === NaN.
			return a !== a && b !== b;
		}
	}

	function greaterThan(a, b) {
		return b > a;
	}

	function lessThan(a, b) {
		return b < a;
	}

	function match(matcher, x) {
		if (type(x) !== 'String') return false;

		if (type(matcher) === 'String') return matcher === x;

		return matcher.test(x);
	}

	function isPrimitive(x) {
		return x === null || typeof x !== 'object' && typeof x !== 'function';
	}

	function isString(x) {
		return typeof x === 'string';
	}

	function isNumber(x) {
		return typeof x === 'number';
	}

	function isBoolean(x) {
		return typeof x === 'boolean';
	}

	function isArray(x) {
		if (x && typeof x === 'object') {
			if (isFunction(Array.isArray)) {
				return Array.isArray(x);
			}
			return type(x) === 'Array';
		}
		return false;
	}

	function isObject(x) {
		if (x && typeof x === 'object') {
			if (isFunction(Object.getPrototypeOf)) {
				var proto = Object.getPrototypeOf;
				return proto === Object.prototype || proto === null;
			}
			return type(x) === 'Object';
		}
		return false;
	}

	function isFunction(x) {
		return typeof x === 'function';
	}

	function isNull(x) {
		return type(x) === 'Null';
	}

	function isUndefined(x) {
		return type(x) === 'Undefined';
	}

	function isNumberNotNaN(x) {
		return isNumber(x) && !isNaN(x);
	}

	function isNonEmptyString(x) {
		return isString(x) && x.length > 0;
	}

	function isEmpty(x) {
		switch (type(x)) {
			case 'Array':
			case 'String':
				return x.length === 0;
			case 'Object':
				return keys(x).length === 0;
			default:
				return !x;
		}
	}

	function includes(item, list) {
		if (isEmpty(list)) {
			return false;
		}

		switch (type(list)) {
			case 'Array':
			case 'String':
				return list.indexOf(item) >= 0;
			case 'Object':
				var objectKeys = keys(list);
				for (var i = objectKeys.length - 1; i >= 0; i--) {
					if (equal(list[objectKeys[i]], item)) return true;
				}
				return false;
			default:
				return false;
		}
	}

	function toString(x) {
		switch (type(x)) {
			case 'String':
				return 'String("'+ x +'")';
			case 'Number':
				return 'Number('+ x +')';
			case 'Boolean':
				return 'Boolean('+ x +')';
			case 'Null':
				return 'null';
			case 'Undefined':
				return 'undefined';
			case 'Array':
				if (x.length === 0) {
					return 'Array([])';
				}
				return 'Array([0..'+ (x.length - 1) +'])';
			case 'Function':
				if (x.name) {
					return 'Function('+ x.name +'() {})';
				}
				return 'Function(function () {})';
			case 'Date':
				return 'Date('+ x.toString() +')';
			default:
				if (typeof x.toJSON === 'function') {
					return JSON.stringify(x.toJSON());
				}
				if (typeof x.inspect === 'function') {
					var rep = x.inspect();
					if (typeof rep === 'string') {
						return rep;
					}
					return toString(rep);
				}
				if (typeof x.constructor === 'function' && x.constructor.name) {
					if (x.constructor.name === 'Object') {
						return 'Object({})';
					}
					var str = typeof x.toString === 'function' ? x.toString() : '{}';
					return x.constructor.name +'('+ str +')';
				}
				if (typeof x.toString === 'function') {
					return x.toString();
				}
				return protoToString.call(x);
		}
	}

	function printObjects() {
		var objects = new Array(arguments.length);
		for (var i = 0; i < objects.length; i++) {
			objects[i] = toString(arguments[i]);
		}
		return objects.join(' ');
	}

	function printf(f) {
		if (typeof f !== 'string') {
			return printObjects.apply(this, arguments);
		}

		if (arguments.length === 1) return f;

		var args = protoSlice.call(arguments, 1);
		var index = 0;
		return f.replace(/(%[\w]{1})/g, function () {
			var str = toString(args[index]);
			index++;
			return str;
		});
	}

	function composeMessage(message, reason) {
		if (message) return message + ' :: ' + reason;
		return reason;
	}

	function assertion1(guard, reason) {
		return function innerAssert(a, message) {
			var result = guard(a);

			if (!result) {
				throw new AssertionError(
					composeMessage(message, reason(a)),
					null,
					innerAssert
				);
			}

			return true;
		};
	}

	function assertion2(guard, reason) {
		return function innerAssert(a, b, message) {
			if (arguments.length < 2) {
				return function curriedInnerAssert(b, message) {
					var result = guard(a, b);

					if (!result) {
						throw new AssertionError(
							composeMessage(message, reason(a, b)),
							null,
							curriedInnerAssert
						);
					}

					return true;
				};
			}

			var result = guard(a, b);

			if (!result) {
				throw new AssertionError(
					composeMessage(message, reason(a, b)),
					null,
					innerAssert
				);
			}

			return true;
		};
	}

	exports.AssertionError = AssertionError;

	exports.helpers = {
		identity: curry1(identity),
		complement: curry1(complement),
		type: curry1(type),
		keys: curry1(keys),
		has: curry2(has),
		equal: curry2(equal),
		greaterThan: curry2(greaterThan),
		lessThan: curry2(lessThan),
		match: curry2(match),
		isPrimitive: curry1(isPrimitive),
		isString: curry1(isString),
		isNumber: curry1(isNumber),
		isBoolean: curry1(isBoolean),
		isArray: curry1(isArray),
		isObject: curry1(isObject),
		isFunction: curry1(isFunction),
		isNull: curry1(isNull),
		isUndefined: curry1(isUndefined),
		isDefined: curry1(complement(isUndefined)),
		isNumberNotNaN: curry1(isNumberNotNaN),
		isNonEmptyString: curry1(isNonEmptyString),
		isEmpty: curry1(isEmpty),
		isNotEmpty: curry1(complement(isEmpty)),
		includes: curry2(includes),
		doesNotInclude: curry2(complement(includes)),
		toString: curry1(toString),
		printf: printf,
		assertion1: assertion1,
		assertion2: assertion2
	};

	exports.assert = {
		isOk: assertion1(identity, function (actual) {
			return printf('expected %x to be truthy', actual);
		}),

		isNotOk: assertion1(complement(identity), function (actual) {
			return printf('expected %x not to be truthy', actual);
		}),

		isEqual: assertion2(equal, function (expected, actual) {
			return printf('expected %x to equal %x', actual, expected);
		}),

		isNotEqual: assertion2(complement(equal), function (expected, actual) {
			return printf('expected %x not to equal %x', actual, expected);
		}),

		isMatch: assertion2(match, function (pattern, actual) {
			return printf('expected %x to match %x', actual, pattern);
		}),

		isNotMatch: assertion2(complement(match), function (pattern, actual) {
			return printf('expected %x not to match %x', actual, pattern);
		}),

		isUndefined: assertion1(isUndefined, function (actual) {
			return printf('expected %x to be undefined', actual);
		}),

		isDefined: assertion1(complement(isUndefined), function (actual) {
			return printf('expected %x to be defined', actual);
		}),

		isEmpty: assertion1(isEmpty, function (actual) {
			return printf('expected %x to be empty', actual);
		}),

		isNotEmpty: assertion1(complement(isEmpty), function (actual) {
			return printf('expected %x not to be empty', actual);
		}),

		includes: assertion2(includes, function (item, list) {
			return printf('expected %x to include %x', list, item);
		}),

		doesNotInclude: assertion2(complement(includes), function (item, list) {
			return printf('expected %x not to include %x', list, item);
		}),

		has: assertion2(has, function (key, target) {
			return printf('expected %x to have key %x', target, key);
		}),

		doesNotHave: assertion2(complement(has), function (key, target) {
			return printf('expected %x not to have key %x', target, key);
		}),

		isGreaterThan: assertion2(greaterThan, function (base, actual) {
			return printf('expected %x to be greater than %x', actual, base);
		}),

		isLessThan: assertion2(lessThan, function (base, actual) {
			return printf('expected %x to be less than %x', actual, base);
		}),

		isNonEmptyString: assertion1(isNonEmptyString, function (actual) {
			return printf('expected %x to be a non empty String', actual);
		}),

		isNumberNotNaN: assertion1(isNumberNotNaN, function (actual) {
			return printf('expected %x to be a number and not NaN', actual);
		})
	};

	exports.use = function use(block) {
		return block(exports);
	};
}));
