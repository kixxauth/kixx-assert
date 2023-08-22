import {
    AssertionError,
    toFriendlyString,
    assertThrowsErrorMessage,
    assertMatches
} from '../mod.js';

import { tests } from './does-match-test.js';


export default function test_assertMatches() {

    tests.forEach(([ matcher, val, messageSuffix, expectedToPass ]) => {
        if (typeof messageSuffix !== 'string') {
            throw new AssertionError(
                `Expected messageSuffix ${ toFriendlyString(messageSuffix) } to be a String`
            );
        }
        if (typeof expectedToPass !== 'boolean') {
            throw new AssertionError(
                `Expected expectedToPass ${ toFriendlyString(expectedToPass) } to be a Boolean`
            );
        }

        messageSuffix = 'with ' + messageSuffix;

        if (expectedToPass) {
            assertMatches(matcher, val, messageSuffix);
        } else {
            assertThrowsErrorMessage(messageSuffix, () => {
                assertMatches(matcher, val, messageSuffix);
            }, messageSuffix);
        }
    });

    // eslint-disable-next-line no-console,no-undef
    console.log('Test assertMatches() passed.');
}
