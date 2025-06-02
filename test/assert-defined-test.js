import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertDefined
} from '../mod.js';

export default function test_assertDefined() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);

    assertThrowsAssertionError(() => {
        assertDefined(undefined, 'of undefined');
    });

    try {
        assertDefined(undefined, 'of undefined');
    } catch (err) {
        assertEqual(
            'Expected undefined to be defined of undefined',
            err.message
        );
    }

    assertDefined({});

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertDefined() passed.');
}

