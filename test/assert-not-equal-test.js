import {
    AssertionError,
    toFriendlyString,
    assertThrowsErrorMessage,
    assertNotEqual
} from '../mod.js';

import { tests } from './is-equal-test.js';


export default function test_assertNotEqual() {

    tests.forEach(([ a, b, messageSuffix, expectedToFail ]) => {
        if (typeof messageSuffix !== 'string') {
            throw new AssertionError(
                `Expected messageSuffix ${ toFriendlyString(messageSuffix) } to be a String`
            );
        }
        if (typeof expectedToFail !== 'boolean') {
            throw new AssertionError(
                `Expected expectedToPass ${ toFriendlyString(expectedToFail) } to be a Boolean`
            );
        }

        messageSuffix = 'with ' + messageSuffix;

        if (expectedToFail) {
            assertThrowsErrorMessage(messageSuffix, () => {
                assertNotEqual(a, b, messageSuffix);
            }, messageSuffix);
        } else {
            assertNotEqual(a, b, messageSuffix);
        }
    });

    tests.forEach(([ a, b, messageSuffix, expectedToFail ]) => {
        messageSuffix = 'with (curried) ' + messageSuffix;

        const assertNotEqualA = assertNotEqual(a);

        if (expectedToFail) {
            assertThrowsErrorMessage(messageSuffix, () => {
                assertNotEqualA(b, messageSuffix);
            }, messageSuffix);
        } else {
            assertNotEqualA(b, messageSuffix);
        }
    });

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertNotEqual() passed.');
}

