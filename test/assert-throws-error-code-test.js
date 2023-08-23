import {
    AssertionError,
    assertThrowsErrorCode
} from '../mod.js';

export default function test_assertThrowsErrorCode() {
    const messageSuffix = 'while testing.';
    let didThrow;
    let assertThrowsFoobar;

    //
    // Try a function which does not throw an error.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorCode(null, () => {
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
        assertThrowsErrorCode(null, () => {
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
    // Try a function which throws an Error with an unexpected code.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorCode('CUSTOM_CODE', () => {
            const err = new TypeError('Not foo or bar');
            err.code = 'FOO';
            throw err;
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw error with code String("CUSTOM_CODE") but instead threw error with code String("FOO") while testing.';

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
    // Try a function which throws an Error with an expected code.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorCode('CUSTOM_CODE', () => {
            const err = new TypeError('Not foo or bar');
            err.code = 'CUSTOM_CODE';
            throw err;
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
    }

    if (didThrow) {
        throw new AssertionError('Expected block NOT to throw');
    }

    //
    // Try a curried assertion to test a function which throws an Error with an unexpected message.
    // ---
    didThrow = false;
    assertThrowsFoobar = assertThrowsErrorCode('foobar');

    try {
        assertThrowsFoobar(() => {
            throw new TypeError('Not foo or bar');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw error with code String("foobar") but instead threw error with code undefined while testing.';

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
    // Try a curried assertion to test a function which throws an Error with an expected message.
    // ---
    didThrow = false;
    assertThrowsFoobar = assertThrowsErrorCode('foobar');

    try {
        assertThrowsFoobar(() => {
            const err = new TypeError('Not foo or bar');
            err.code = 'foobar';
            throw err;
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
        assertThrowsErrorCode('foobar', async () => {
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
    console.log('Test assertThrowsErrorCode() passed.');
}
