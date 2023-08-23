import {
    AssertionError,
    assertEqual,
    isEmpty
} from '../mod.js';

import { getValues } from './values.js';


export default function test_isEmpty() {

    const assertTrue = assertEqual(true);
    const assertFalse = assertEqual(false);

    const tests = getValues(([ obj, messageSuffix ]) => {
        return [ obj, `for ${ messageSuffix };` ];
    });

    // Iterate through all the test values, not to get keys, but to ensure the
    // target function does not throw.
    tests.forEach(([ obj, messageSuffix ]) => {
        let result;
        try {
            result = isEmpty(obj);
        } catch (err) {
            throw new AssertionError(
                `Unexpected error calling target function ${ messageSuffix }`,
                { cause: err }
            );
        }

        assertEqual('boolean', typeof result, messageSuffix);
    });

    assertFalse(isEmpty([ 1 ]));
    assertTrue(isEmpty([]));

    assertFalse(isEmpty({ foo: 'bar' }));
    assertTrue(isEmpty({}));

    assertFalse(isEmpty(new Map([ [ 'foo', 'bar' ] ])));
    assertTrue(isEmpty(new Map()));

    assertFalse(isEmpty(new Set([{}])));
    assertTrue(isEmpty(new Set()));

    assertFalse(isEmpty('foo'));
    assertTrue(isEmpty(''));

    assertTrue(isEmpty(null));
    assertTrue(isEmpty(NaN));
    assertTrue(isEmpty(undefined)); // eslint-disable-line no-undefined
    assertTrue(isEmpty(void 0));
    assertTrue(isEmpty());

    assertFalse(isEmpty(true));
    assertTrue(isEmpty(false));

    assertFalse(isEmpty(-1));
    assertTrue(isEmpty(0));

    assertFalse(isEmpty(BigInt(1)));
    assertTrue(isEmpty(BigInt(0)));

    assertFalse(isEmpty(Symbol('foo')));
    assertFalse(isEmpty(Symbol()));

    assertFalse(isEmpty(new Date()));
    assertFalse(isEmpty(/^foo/i));

    // eslint-disable-next-line no-console,no-undef
    console.log('Test isEmpty() passed.');
}

