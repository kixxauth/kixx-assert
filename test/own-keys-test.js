import {
    AssertionError,
    assert,
    assertEqual,
    ownKeys
} from '../mod.js';

import { getValues } from './values.js';


export default function test_ownKeys() {

    class Widget {

        constructor() {
            this.prop = 1;

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

    const tests = getValues(([ obj, messageSuffix ]) => {
        return [ obj, `for ${ messageSuffix };` ];
    });

    // Iterate through all the test values, not to get keys, but to ensure the
    // target function does not throw.
    tests.forEach(([ obj, messageSuffix ]) => {
        let result;
        try {
            result = ownKeys(obj);
        } catch (err) {
            throw new AssertionError(
                `Unexpected error calling target function ${ messageSuffix }`,
                { cause: err }
            );
        }

        assert(Array.isArray(result), `result is an Array ${ messageSuffix }`);
    });

    const widget = Widget.create();
    const classKeys = ownKeys(Widget);
    const instanceKeys = ownKeys(widget);

    assert(Array.isArray(classKeys));
    assertEqual(0, classKeys.length);

    assert(Array.isArray(instanceKeys));
    assert(2, instanceKeys.length);
    assertEqual('prop', instanceKeys[0]);
    assertEqual('obvious', instanceKeys[1]);

    // eslint-disable-next-line no-console,no-undef
    console.log('Test ownKeys() passed.');
}

