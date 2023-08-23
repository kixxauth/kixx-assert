import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertIncludes
} from '../mod.js';


export default function test_assertIncludes() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);
    const assertIncludes1 = assertIncludes(1);

    assertThrowsAssertionError(() => {
        assertIncludes(2, [ 1 ], 'in Array of 1');
    });

    try {
        assertIncludes(2, [ 1 ], 'in Array of 1');
    } catch (err) {
        assertEqual(
            'Expected Array([0..0]) to include Number(2) in Array of 1',
            err.message
        );
    }

    assertThrowsAssertionError(() => {
        assertIncludes1([ 2 ], 'in Array of 2');
    });

    try {
        assertIncludes1([ 2 ], 'in Array of 2');
    } catch (err) {
        assertEqual(
            'Expected Array([0..0]) to include Number(1) in Array of 2',
            err.message
        );
    }

    assertIncludes(1, [ 1 ]);
    assertIncludes1([ 1 ]);

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertIncludes() passed.');
}

