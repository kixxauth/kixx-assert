import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertUndefined
} from '../mod.js';

export default function test_assertUndefined() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);

    assertThrowsAssertionError(() => {
        assertUndefined(1, 'of 1');
    });

    try {
        assertUndefined(1, 'of 1');
    } catch (err) {
        assertEqual(
            'Expected Number(1) to be undefined of 1',
            err.message
        );
    }

    assertUndefined(undefined);

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertUndefined() passed.');
}

