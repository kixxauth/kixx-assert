import {
    AssertionError,
    assertEqual,
    has
} from '../mod.js';

import { getValues } from './values.js';


export default function test_has() {

    class Widget {

        prop = 1;

        constructor() {
            Object.defineProperties(this, {
                obvious: {
                    enumerable: true,
                    value: 2,
                },
                needToKnow: {
                    enumerable: false,
                    value: 3,
                },
            });
        }

        get bar() {
            return 4;
        }

        start() {
            return null;
        }

        static create() {
            return new Widget();
        }
    }

    function getRandomPropName() {
        const props = [
            'length',
            'size',
            'toString',
            'valueOf',
        ];

        const randomIndex = Math.floor(Math.random() * props.length);
        return props[ randomIndex ];
    }

    const tests = getValues(([ obj, messageSuffix ]) => {
        return [ obj, `for ${ messageSuffix };`, getRandomPropName() ];
    });

    // Iterate through all the test values, not to detect a prop, but to ensure the
    // target function does not throw.
    tests.forEach(([ obj, messageSuffix, propname ]) => {
        try {
            has(propname, obj);
            // The propname *should* be a String, but we don't enforce it.
            has(obj, {});
        } catch (err) {
            throw new AssertionError(
                `Unexpected error calling target function ${ messageSuffix }`,
                { cause: err }
            );
        }
    });

    const widget = Widget.create();
    const assertTrue = assertEqual(true);
    const assertFalse = assertEqual(false);
    const hasProp = has('prop');
    const hasConstructor = has('constructor');
    const hasObvious = has('obvious');
    const hasNeedToKnow = has('needToKnow');
    const hasBar = has('bar');
    const hasStart = has('start');
    const hasFoo = has('foo');
    const hasCreate = has('create');

    assertTrue(hasProp(widget));
    assertTrue(has('prop', widget));
    assertTrue(hasConstructor(widget));
    assertTrue(has('constructor', widget));
    assertTrue(hasObvious(widget));
    assertTrue(has('obvious', widget));
    assertTrue(hasNeedToKnow(widget));
    assertTrue(has('needToKnow', widget));
    assertTrue(hasBar(widget));
    assertTrue(has('bar', widget));
    assertTrue(hasStart(widget));
    assertTrue(has('start', widget));
    assertFalse(hasFoo(widget));
    assertFalse(has('foo', widget));
    assertTrue(hasCreate(Widget));
    assertTrue(has('create', Widget));

    // eslint-disable-next-line no-console,no-undef
    console.log('Test has() passed.');
}

