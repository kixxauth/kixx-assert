import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertNotDefined
} from '../mod.js';

export default function test_assertNotDefined() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);

    assertThrowsAssertionError(() => {
        assertNotDefined(1, 'of 1');
    });

    try {
        assertNotDefined(1, 'of 1');
    } catch (err) {
        assertEqual(
            'Expected Number(1) to be undefined of 1',
            err.message
        );
    }

    // eslint-disable-next-line no-undefined
    assertNotDefined(undefined);

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertNotDefined() passed.');
}

