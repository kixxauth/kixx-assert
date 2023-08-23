import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertEmpty
} from '../mod.js';

export default function test_assertEmpty() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);

    assertThrowsAssertionError(() => {
        assertEmpty([ 1 ], '; Array of 1');
    });

    try {
        assertEmpty([ 1 ], 'in Array of 1');
    } catch (err) {
        assertEqual(
            'Expected Array([0..0]) to be empty, null, or NaN in Array of 1',
            err.message
        );
    }

    assertEmpty({});

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertEmpty() passed.');
}

