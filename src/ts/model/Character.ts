/**
 * A character token.
 *
 * Provides utility methods to determine the type of the current character token.
 */
export default class Character {
    constructor(public readonly value: string) {
        if (value.length !== 1) {
            throw new Error(`Invalid character given; string too ${value.length > 1 ? 'long' : 'short'}.`);
        }
    }

    public isWhitespace(): boolean {
        switch (this.value) {
            case '\t':
            case '\n':
            case '\l':
            case '\r':
            case ' ':
                return true;
            default:
                return false;
        }
    }
}
