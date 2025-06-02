import { AssertionError } from '../mod.js';


export function assertThrowsErrorMessage(includedString, func) {
    try {
        func();
    } catch (err) {
        if (!err.message.includes(includedString)) {
            throw new AssertionError(`Expected error message "${ err.message }" to include "${ includedString }"`);
        }
    }
}

export function assertThrowsAssertionError(func) {
    try {
        func();
    } catch (err) {
        if (!(err instanceof AssertionError)) {
            throw new AssertionError(`Expected error to be an AssertionError, but got ${ err.constructor.name }`);
        }
    }
}
