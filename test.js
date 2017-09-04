/* globals require, kixxAssert, console */
(function (kixxAssert) {
	'use strict';

	var helpers = kixxAssert.helpers;
	var assert = kixxAssert.assert;
	var AssertionError = kixxAssert.AssertionError;

	function test(title, block) {
		try {
			block();
		} catch (err) {
			console.error('Fail: '+ title); // eslint-disable-line no-console
			console.error(err.stack); // eslint-disable-line no-console
			return false;
		}

		console.log('Pass: '+ title); // eslint-disable-line no-console
		return true;
	}

	test('AssertionError', function () {
		var err = new AssertionError();
		assert.isEqual('Unspecified AssertionError', err.message, '.message');
		assert.isEqual('AssertionError', err.name, '.name');

		// Slices unwanted items off the stack when capturing the stack trace.
		// The first line of the stack trace is .name and .message, the second
		// line is a reference to the file location, which should be right here:
		var secondLine = err.stack.split('\n')[1];
		assert.isMatch(/\/test\.js:[\d]{2}:[\d]{2}$/, secondLine, '.stack');
	});

	test('assertion() factory', function () {
		var assertTruthy = helpers.assertion1(helpers.identity, function (actual) {
			return helpers.printf('expected %x to be truthy', actual);
		});

		var assertEqual = helpers.assertion2(helpers.equal, function (expected, actual) {
			return helpers.printf('expected %x to equal %x', actual, expected);
		});

		var err1;
		var err2;

		try {
			assertTruthy(false, 'supposed to be false');
		} catch (err) {
			err1 = err;
		}

		try {
			assertEqual(1, 2, 'supposed to be equal');
		} catch (err) {
			err2 = err;
		}

		assert.isDefined(err1, 'error 1');
		assert.isDefined(err2, 'error 2');

		var stack1 = err1.stack.split('\n');
		var stack2 = err2.stack.split('\n');

		assert.isEqual('AssertionError: supposed to be false :: expected Boolean(false) to be truthy', stack1[0]);
		assert.isMatch(/\/test\.js:[\d]{2}:[\d]{1}$/, stack1[1]);

		assert.isEqual('AssertionError: supposed to be equal :: expected Number(2) to equal Number(1)', stack2[0]);
		assert.isMatch(/\/test\.js:[\d]{2}:[\d]{1}$/, stack2[1]);
	});

	test('helpers.identity()', function () {
		var x = {rnd: Math.random()};
		var y = helpers.identity(x);
		assert.isEqual(x, y, 'returns exact given argument');
	});

	test('helpers.complement()', function () {
		var flipflop = helpers.complement(helpers.identity);
		var x = true;
		var y = flipflop(x);
		assert.isEqual(false, y, 'creates a function which returns the boolean opposite');
	});

	test('helpers.toString()', function () {
		var s = '';
		var i = 0;
		var b = false;
		var f = 1.1;
		var u = (function (_a) { return _a; }());
		var n = null;
		var nn = 1 / 'foo'; // NaN
		var a = [null, null];
		var o = {};
		var d = new Date();
		var r = /foo$/;

		var fn = function boilWater() {};

		var json = {
			toJSON: function () {
				return {foo: 'bar'};
			}
		};

		function Cat() {}
		Cat.prototype.toString = function () { return 'Garfield'; };

		var cat = new Cat();

		assert.isEqual('String("")', helpers.toString(s), 'String');
		assert.isEqual('Number(0)', helpers.toString(i), 'Number');
		assert.isEqual('Boolean(false)', helpers.toString(b), 'Boolean');
		assert.isEqual('Number(1.1)', helpers.toString(f), 'Float');
		assert.isEqual('undefined', helpers.toString(u), 'Undefined');
		assert.isEqual('null', helpers.toString(n), 'Null');
		assert.isEqual('Number(NaN)', helpers.toString(nn), 'NaN');
		assert.isEqual('Array([0..1])', helpers.toString(a), 'Array');
		assert.isEqual('Object({})', helpers.toString(o), 'Object');
		assert.isEqual('Date('+ d.toString() +')', helpers.toString(d), 'Date');
		assert.isEqual('RegExp(/foo$/)', helpers.toString(r), 'RegExp');
		assert.isEqual('Function(boilWater() {})', helpers.toString(fn), 'function');
		assert.isEqual('{"foo":"bar"}', helpers.toString(json), 'with toJSON');
		assert.isEqual('Cat(Garfield)', helpers.toString(cat), 'custom constructor');
	});

	test('assert.isOk()', function () {
		try {
			assert.isOk(false, 'should fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('should fail :: expected Boolean(false) to be truthy', err.message);
		}

		assert.isOk(true, 'should pass');
	});

	test('assert.isNotOk()', function () {
		try {
			assert.isNotOk(true, 'should fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('should fail :: expected Boolean(true) not to be truthy', err.message);
		}

		assert.isNotOk(false, 'should pass');
	});

	test('assert.isEqual()', function () {
		try {
			assert.isEqual({}, {}, 'should fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('should fail :: expected Object({}) to equal Object({})', err.message);
		}
	});

	test('assert.isNotEqual()', function () {
		var x = {};
		var y = x;

		try {
			assert.isNotEqual(x, y, 'should fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('should fail :: expected Object({}) not to equal Object({})', err.message);
		}

		assert.isNotEqual({}, {}, 'should pass');
	});

	test('assert.isMatch()', function () {
		assert.isMatch('foo', 'foo', 'using string match');
		assert.isMatch(/^[fo]{3}$/, 'foo', 'using RegExp match');
	});

	test('assert.isDefined', function () {
		var obj = {
			x: null
		};

		try {
			assert.isDefined(obj.y, 'fails');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('fails :: expected undefined to be defined', err.message);
		}

		assert.isDefined(obj.x, 'passes');
	});

	test('assert.isNotEmpty', function () {
		var s = '';
		var i = 0;
		var b = false;
		var u = (function (_a) { return _a; }());
		var n = null;
		var nn = 1 / 'foo'; // NaN
		var a = [0, 0];
		var o = {};
		var d = new Date();

		var fn = function boilWater() {};

		function Cat() {
			this.color = 'black';
		}

		var cat = new Cat();

		try {
			assert.isNotEmpty(s, 'String');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNotEmpty('foo', 'full String');

		try {
			assert.isNotEmpty(i, 'Integer');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNotEmpty(-1, 'truthy Number');

		try {
			assert.isNotEmpty(b, 'Boolean');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNotEmpty(true, 'true');

		try {
			assert.isNotEmpty(u, 'undefined');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNotEmpty(n, 'null');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNotEmpty(nn, 'NaN');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNotEmpty(a, 'Array');

		try {
			assert.isNotEmpty(o, 'Object');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNotEmpty(d, 'Date');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNotEmpty(fn, 'Function');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNotEmpty(cat, 'Cat');
	});

	test('assert.includes()', function () {
		var s = '';
		var i = 1;
		var b = true;
		var u = (function (_a) { return _a; }());
		var n = null;
		var nn = 1 / 'foo'; // NaN
		var d = new Date();

		var fn = function boilWater() {};

		var x = {};

		var a = [null, x, null];
		var o = {a: null, b: x, c: null};
		var str = 'The quick brown fox jumped over the lazy dog.';

		try {
			assert.includes('', s, 'String');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(1, i, 'Integer');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(true, b, 'Integer');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(u, u, 'undefined');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(null, n, 'null');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(NaN, nn, 'NaN');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(d.getMonth(), d, 'Date');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.includes(0, fn, 'Function');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.includes(x, a, 'Array');
		assert.includes(x, o, 'Object');
		assert.includes('fox', str, 'non empty String');
	});

	test('assert.has()', function () {
		var u = (function (_a) { return _a; }());
		var o = {x: u};
		var a = [u];

		assert.has('x', o, 'Object key');
		assert.has('0', a, 'Arry string key');
		assert.has(0, a, 'Arry integer index');

		try {
			assert.has('k', u, 'undefined list');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('TypeError', err.name);
		}

		try {
			assert.has('k', null, 'null list');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('TypeError', err.name);
		}

		try {
			assert.has('k', 'k', 'string');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.has(1, 1, 'number');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		// Auto assigned members.
		assert.has('length', a, '[].length');
		assert.has('length', 'foo', '"foo".length');
	});

	test('assert.doesNotHave()', function () {
		var u = (function (_a) { return _a; }());
		var o = {x: u};
		var a = [u];
		var d = new Date();

		try {
			assert.doesNotHave('x', o, 'Object key fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.doesNotHave('k', 0, 'Object key pass');

		try {
			assert.doesNotHave('0', a, 'Array key string fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.doesNotHave(0, a, 'Array index integer fail');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.doesNotHave('1', a, 'Array key string pass');
		assert.doesNotHave(1, a, 'Array index integer pass');

		// Prototype members
		assert.doesNotHave('toString', d, 'toString');
		assert.doesNotHave('getMonth', d, 'getMonth');
	});

	test('assert.isGreaterThan()', function () {
		var u = (function (_a) { return _a; }());

		assert.isGreaterThan(0, 1, 'integer');
		assert.isGreaterThan(0.1, 0.2, 'float');
		assert.isGreaterThan('a', 'b', 'letter');
		assert.isGreaterThan('A', 'a', 'case sensitive letter');

		try {
			assert.isGreaterThan(1, 1, 'same integer');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isGreaterThan('a', 'a', 'same letter');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isGreaterThan(null, u, 'null undefined');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}
	});

	test('assert.isLessThan()', function () {
		var u = (function (_a) { return _a; }());

		assert.isLessThan(1, 0, 'integer');
		assert.isLessThan(0.2, 0.1, 'float');
		assert.isLessThan('b', 'a', 'letter');
		assert.isLessThan('a', 'A', 'case sensitive letter');

		try {
			assert.isLessThan(1, 1, 'same integer');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isLessThan('a', 'a', 'same letter');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isLessThan(null, u, 'null undefined');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}
	});

	test('assert.isNonEmptyString', function () {
		var a = [0, 1];
		var x = 'xxx';
		var y = '';

		try {
			assert.isNonEmptyString(a, 'Array');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNonEmptyString(y, 'empty string');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNonEmptyString(x, 'passing');
	});

	test('assert.isNumberNotNaN', function () {
		var a = [0, 1];
		var s = '1';
		var nn = 1 / 'foo'; // NaN

		try {
			assert.isNumberNotNaN(a, 'Array');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNumberNotNaN(s, 'String');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		try {
			assert.isNumberNotNaN(nn, 'NaN');
			throw new AssertionError('Should have thrown!');
		} catch (err) {
			assert.isEqual('AssertionError', err.name);
		}

		assert.isNumberNotNaN(0, 'zero');
		assert.isNumberNotNaN(1.1, 'float');
		assert.isNumberNotNaN(Infinity, 'Infinity');
	});
}(typeof require === 'undefined' ? kixxAssert : require('./kixx-assert')));
