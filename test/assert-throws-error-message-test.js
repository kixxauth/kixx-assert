import {
    AssertionError,
    assertThrowsErrorMessage
} from '../mod.js';

export default function test_assertThrowsErrorMessage() {
    const messageSuffix = 'while testing.';
    let didThrow;
    let assertThrowsFoobar;

    //
    // Try a function which does not throw an error.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorMessage(null, () => {
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
        assertThrowsErrorMessage(null, () => {
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
    // Try a function which throws an Error with an unexpected message.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorMessage('foo bar', () => {
            throw new TypeError('Not foo or bar');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw error message including part "foo bar" but instead threw error message Not foo or bar while testing.';

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
    // Try a function which throws an Error with an expected message.
    // ---
    didThrow = false;

    try {
        assertThrowsErrorMessage('foobar', () => {
            throw new TypeError('Contains foobar');
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
    assertThrowsFoobar = assertThrowsErrorMessage('foobar');

    try {
        assertThrowsFoobar(() => {
            throw new TypeError('Not foo or bar');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw error message including part "foobar" but instead threw error message Not foo or bar while testing.';

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
    assertThrowsFoobar = assertThrowsErrorMessage('foobar');

    try {
        assertThrowsFoobar(() => {
            throw new TypeError('Contains foobar');
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
        assertThrowsErrorMessage('foobar', async () => {
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
    console.log('Test assertThrowsErrorMessage() passed.');
}
