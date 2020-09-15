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
        return (this.value.match(/\s/) !== null);
    }

    public isOpeningBracket(): boolean {
        return this.value === '(';
    }

    public isClosingBracket(): boolean {
        return this.value === ')';
    }

    public static splitString(value: string): Character[] {
        return [...value].map(character => new Character(character));
    }
}
