/**
 * A character token.
 *
 * Provides utility methods to determine the type of the current character token.
 */
export default class Character {
    constructor(public readonly value: string) {
    }

    public isWhitespace(): boolean {
        return false;
    }
}