const protoToString = Object.prototype.toString;
const protoHasOwnProperty = Object.prototype.hasOwnProperty;
const useNativeHasOwn = typeof Object.hasOwn === 'function';

export class AssertionError extends Error {
    constructor(message, spec, caller) {
        spec = spec || {};

        if (spec.code) {
            message = `${ spec.code } ${ message }`;
        }

        super(message);

        const code = spec.code || 'ERR_ASSERTION';

        Object.defineProperties(this, {
            name: {
                enumerable: true,
                value: 'AssertionError',
            },
            message: {
                enumerable: true,
                value: message,
            },
            code: {
                enumerable: true,
                value: code,
            },
            fatal: {
                enumerable: true,
                value: Boolean(spec.fatal),
            },
            cause: {
                enumerable: true,
                value: spec.cause || null,
            },
            info: {
                enumerable: true,
                value: Object.assign({}, spec.info || {}),
            },
        });

        if (Error.captureStackTrace && caller) {
            Error.captureStackTrace(this, caller);
        }
    }
}

export function isString(x) {
    // This expression will not catch strings created with new String('foo'):
    // return typeof x === 'string';
    return protoToString.call(x) === '[object String]';
}

export function isNonEmptyString(x) {
    return Boolean(x && isString(x));
}

export function isNumber(x) {
    // This expression will not catch numbers created with new Number(1):
    // return typeof x === 'number';
    const tag = protoToString.call(x);
    return tag === '[object Number]' || tag === '[object BigInt]';
}

export function isNumberNotNaN(x) {
    return isNumber(x) && !Number.isNaN(x);
}

export function isBoolean(x) {
    // This expression will not catch booleans created with new Boolean(1):
    // return typeof x === 'boolean';
    return protoToString.call(x) === '[object Boolean]';
}

export function isSymbol(x) {
    // Since calling new Symbol() will throw, then we do not need to worry about
    // the typeof call returning "object".
    return typeof x === 'symbol';
}

export function isBigInt(x) {
    // Since calling new BigInt() will throw, then we do not need to worry about
    // the typeof call returning "object".
    return typeof x === 'bigint';
}

export function isUndefined(x) {
    return typeof x === 'undefined';
}

export function isPrimitive(x) {
    return x === null
        || isString(x)
        || isNumber(x)
        || isBigInt(x)
        || isBoolean(x)
        || isSymbol(x)
        || isUndefined(x);
}

export function isFunction(x) {
    return typeof x === 'function';
}

export function isPlainObject(x) {
    if (!x || typeof x !== 'object') {
        return false;
    }
    if (!Object.getPrototypeOf(x)) {
        return true;
    }
    return x.constructor && x.constructor.name === 'Object';
}

export function isDate(x) {
    return protoToString.call(x) === '[object Date]';
}

export function isValidDate(x) {
    if (isDate(x)) {
        return !Number.isNaN(x.getTime());
    }
    return false;
}

export function isRegExp(x) {
    return protoToString.call(x) === '[object RegExp]';
}

export function isMap(x) {
    const tag = protoToString.call(x);
    return tag === '[object Map]' || tag === '[object WeakMap]';
}

export function isSet(x) {
    const tag = protoToString.call(x);
    return tag === '[object Set]' || tag === '[object WeakSet]';
}

export function hasOwn(key, obj) {
    if (arguments.length < 2) {
        return function curriedHasOwn(_obj) {
            return hasOwn(key, _obj);
        };
    }
    if (key && !Object.getPrototypeOf(key)) {
        key = 'null';
    }
    if (useNativeHasOwn) {
        return obj && Object.hasOwn(obj, key);
    }
    return obj && protoHasOwnProperty.call(obj, key);
}

export function has(key, obj) {
    if (arguments.length < 2) {
        return function curriedHas(_obj) {
            return has(key, _obj);
        };
    }

    if (isPrimitive(obj)) {
        return false;
    }
    if (key && !Object.getPrototypeOf(key)) {
        key = 'null';
    }
    return obj && key in obj;
}

export function ownKeys(obj) {
    return obj ? Object.keys(obj) : [];
}

export function isEmpty(x) {
    switch (protoToString.call(x)) {
        case '[object Array]':
        case '[object String]':
            return x.length === 0;
        case '[object Map]':
        case '[object Set]':
            return x.size === 0;
        case '[object Null]':
        case '[object Undefined]':
            return true;
        case '[object Boolean]':
        case '[object Number]':
        case '[object BigInt]':
            return !x;
        case '[object Symbol]':
            return false;
        default:
            if (isPlainObject(x)) {
                return Object.keys(x).length === 0;
            }
            return false;
    }
}

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

//
// WARNING
// These error assertions are untested and undocumented but left here as reference.
//
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

//
// WARNING
// These error assertions are untested and undocumented but left here as reference.
//
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

//
// WARNING
// These error assertions are untested and undocumented but left here as reference.
//
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
