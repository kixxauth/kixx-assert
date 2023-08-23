import {
    AssertionError,
    assertEqual,
    includes
} from '../mod.js';

import { getValues } from './values.js';


export default function test_includes() {

    const assertTrue = assertEqual(true);
    const assertFalse = assertEqual(false);

    const tests = getValues(([ obj, messageSuffix ]) => {
        return [ obj, `for ${ messageSuffix };` ];
    });

    // Iterate through all the test values, not to get a result, but to ensure the
    // target function does not throw.
    tests.forEach(([ obj, messageSuffix ]) => {
        let result;
        try {
            result = includes(obj, 1);
        } catch (err) {
            throw new AssertionError(
                `Unexpected error calling target function ${ messageSuffix }`,
                { cause: err }
            );
        }

        assertEqual('boolean', typeof result, messageSuffix);

        try {
            result = includes({}, obj);
        } catch (err) {
            throw new AssertionError(
                `Unexpected error calling target function ${ messageSuffix }`,
                { cause: err }
            );
        }

        assertEqual('boolean', typeof result, messageSuffix);
    });

    const keyRef = {};
    const includesKeyRef = includes(keyRef);
    const includesX = includes('x');

    assertFalse(includes(1, [ 'x' ]));
    assertTrue(includes('x', [ 'x' ]));
    assertFalse(includesKeyRef([ 'x' ]));
    assertTrue(includesKeyRef([ keyRef ]));
    assertTrue(includesX([ 'x' ]));
    assertFalse(includesX([ keyRef ]));

    assertFalse(includes('x', new Map()));
    assertTrue(includes('x', new Map([ [ 'foo', 'x' ] ])));
    assertFalse(includesX(new Map()));
    assertTrue(includesX(new Map([ [ 'foo', 'x' ] ])));

    assertFalse(includes(keyRef, new Set()));
    assertTrue(includes(keyRef, new Set([ keyRef ])));
    assertFalse(includesKeyRef(new Set()));
    assertTrue(includesKeyRef(new Set([ keyRef ])));

    assertFalse(includes('x', 'foo'));
    assertTrue(includes('oo', 'foo'));
    assertFalse(includesX('foo'));
    assertTrue(includesX('-xxx-'));
    assertFalse(includesKeyRef('foo'));

    assertFalse(includes('x', { foo: 1 }));
    assertFalse(includesX({ foo: 1 }));
    assertTrue(includes(1, { foo: 1 }));
    assertTrue(includesX({ foo: 'x' }));
    assertTrue(includesKeyRef({ foo: keyRef }));

    assertFalse(includes('x', new WeakMap()));
    assertFalse(includes('x', new WeakMap([ [ keyRef, 'x' ] ])));
    assertTrue(includes(keyRef, new WeakMap([ [ keyRef, 'x' ] ])));
    assertTrue(includesKeyRef(new WeakMap([ [ keyRef, 'x' ] ])));
    assertFalse(includesX(new WeakMap([ [ keyRef, 'x' ] ])));

    assertFalse(includes(keyRef, new WeakSet()));
    assertTrue(includes(keyRef, new WeakSet([ keyRef ])));
    assertFalse(includesKeyRef(new WeakSet()));
    assertTrue(includesKeyRef(new WeakSet([ keyRef ])));

    assertFalse(includesX(null));
    assertFalse(includesX(NaN));
    assertFalse(includesX(1));
    assertFalse(includesX(BigInt(7)));
    assertFalse(includesX(true));

    // eslint-disable-next-line no-console,no-undef
    console.log('Test includes() passed.');
}

