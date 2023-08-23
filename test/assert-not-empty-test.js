import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertNotEmpty
} from '../mod.js';

export default function test_assertNotEmpty() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);

    assertThrowsAssertionError(() => {
        assertNotEmpty([], 'in Array of 0');
    });

    try {
        assertNotEmpty([], 'in Array of 0');
    } catch (err) {
        assertEqual(
            'Expected Array([]) NOT to be empty, null, or NaN in Array of 0',
            err.message
        );
    }

    assertNotEmpty({ foo: 'bar' });

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertNotEmpty() passed.');
}

