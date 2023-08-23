import {
    AssertionError,
    assertThrowsErrorClass
} from '../mod.js';

export default function test_assertThrowsErrorClass() {
    const messageSuffix = 'while testing.';
    let didThrow;

    //
    // Try a function which does not throw an error.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorClass(null, () => {
            return null;
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw while testing.';

        if (err.name !== 'AssertionError') {
            throw new AssertionError(
                `Expected err.name to be "AssertionError" instead of "${ err.name }"`
            );
        }
        if (err.message !== expectedMessage) {
            throw new AssertionError(
                `Expected err.message to be "${ expectedMessage }" instead of "${ err.message }"`
            );
        }
    }

    if (!didThrow) {
        throw new AssertionError('Expected block to throw');
    }

    //
    // Try a function which throws something other than an Error.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorClass(Error, () => {
            // eslint-disable-next-line no-throw-literal
            throw 'Not an Error';
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw instance of Error but instead threw instance of String while testing.';

        if (err.name !== 'AssertionError') {
            throw new AssertionError(
                `Expected err.name to be "AssertionError" instead of "${ err.name }"`
            );
        }
        if (err.message !== expectedMessage) {
            throw new AssertionError(
                `Expected err.message to be "${ expectedMessage }" instead of "${ err.message }"`
            );
        }
    }

    if (!didThrow) {
        throw new AssertionError('Expected block to throw');
    }

    //
    // Try a function which throws an Error of unexpected type.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorClass(SyntaxError, () => {
            throw new TypeError('Not a SyntaxError');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw instance of SyntaxError but instead threw instance of TypeError while testing.';

        if (err.name !== 'AssertionError') {
            throw new AssertionError(
                `Expected err.name to be "AssertionError" instead of "${ err.name }"`
            );
        }
        if (err.message !== expectedMessage) {
            throw new AssertionError(
                `Expected err.message to be "${ expectedMessage }" instead of "${ err.message }"`
            );
        }
    }

    if (!didThrow) {
        throw new AssertionError('Expected block to throw');
    }

    //
    // Try a function which throws an Error with an expected class.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorClass(TypeError, () => {
            throw new TypeError('Not a SyntaxError');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
    }

    if (didThrow) {
        throw new AssertionError('Expected block NOT to throw');
    }

    //
    // Try a curried assertion to test a function which throws an Error with an unexpected class.
    // ---
    didThrow = false;
    const assertThrowsTypeError = assertThrowsErrorClass(TypeError);

    try {
        assertThrowsTypeError(() => {
            throw new SyntaxError('Not a TypeError');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw instance of TypeError but instead threw instance of SyntaxError while testing.';

        if (err.name !== 'AssertionError') {
            throw new AssertionError(
                `Expected err.name to be "AssertionError" instead of "${ err.name }"`
            );
        }
        if (err.message !== expectedMessage) {
            throw new AssertionError(
                `Expected err.message to be "${ expectedMessage }" instead of "${ err.message }"`
            );
        }
    }

    if (!didThrow) {
        throw new AssertionError('Expected block to throw');
    }

    //
    // Try a curried assertion to test a function which throws an Error with an expected class.
    // ---
    didThrow = false;

    try {
        assertThrowsTypeError(() => {
            throw new TypeError('Not a SyntaxError');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
    }

    if (didThrow) {
        throw new AssertionError('Expected block NOT to throw');
    }

    // It does not work with asynchronous functions.
    // Try an async function which synchronously throws an Error.
    //
    // This block is not normally run because the error will be thrown in a new turn of the
    // event loop which causes the process to exit with an error.
    /*
    try {
        assertThrowsErrorClass('foobar', async () => {
            throw new TypeError('foobar');
        }, messageSuffix)
    } catch (err) {
        const expectedMessage = 'Expected function to throw while testing.';

        if (err.name !== 'AssertionError') {
            throw new AssertionError(
                `Expected err.name to be "AssertionError" instead of "${ err.name }"`
            );
        }
        if (err.message !== expectedMessage) {
            throw new AssertionError(
                `Expected err.message to be "${ expectedMessage }" instead of "${ err.message }"`
            );
        }
    }
    */

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertThrowsErrorClass() passed.');
}
