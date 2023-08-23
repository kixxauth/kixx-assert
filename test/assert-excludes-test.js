import {
    AssertionError,
    assertEqual,
    assertThrowsErrorClass,
    assertExcludes
} from '../mod.js';


export default function test_assertExcludes() {
    const assertThrowsAssertionError = assertThrowsErrorClass(AssertionError);
    const assertExcludes1 = assertExcludes(1);

    assertThrowsAssertionError(() => {
        assertExcludes(2, [ 2 ], 'in Array of 2');
    });

    try {
        assertExcludes(2, [ 2 ], 'in Array of 2');
    } catch (err) {
        assertEqual(
            'Expected Array([0..0]) NOT to include Number(2) in Array of 2',
            err.message
        );
    }

    assertThrowsAssertionError(() => {
        assertExcludes1([ 1 ], 'in Array of 1');
    });

    try {
        assertExcludes1([ 1 ], 'in Array of 1');
    } catch (err) {
        assertEqual(
            'Expected Array([0..0]) NOT to include Number(1) in Array of 1',
            err.message
        );
    }

    assertExcludes(1, [ 2 ]);
    assertExcludes1([ 2 ]);

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertExcludes() passed.');
}

