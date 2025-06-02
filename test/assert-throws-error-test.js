import {
    AssertionError,
    assertThrowsError
} from '../mod.js';

export default function test_assertThrowsError() {
    const messageSuffix = 'while testing.';
    let didThrow;

    //
    // Try a function which does not throw an error.
    // ---
    didThrow = false;

    try {
        assertThrowsError(() => {
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
        assertThrowsError(() => {
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
        assertThrowsError(() => {
            throw new Date('1980');
        }, messageSuffix);
    } catch (err) {
        didThrow = true;
        // Uncomment to see the stack trace
        // console.log(err);

        const expectedMessage = 'Expected function to throw instance of Error but instead threw instance of Date while testing.';

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
    // Try a function which throws an Error as expected.
    // ---
    didThrow = false;

    try {
        assertThrowsError(() => {
            throw new TypeError('Not a SyntaxError');
        }, messageSuffix);
    } catch (err) { // eslint-disable-line no-unused-vars
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
        assertThrowsError('foobar', async () => {
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
    console.log('Test assertThrowsError() passed.');
}
