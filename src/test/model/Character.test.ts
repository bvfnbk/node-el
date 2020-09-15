import Character from '../../ts/model/Character';

test('Character: constructor accepts only single character strings as arguments.', () => {
    expect(() => new Character('ab')).toThrow(
        new Error('Invalid character given; string too long.')
    );
    expect(() => new Character('')).toThrow(
        new Error('Invalid character given; string too short.')
    );
});

test('Character: correctly detects whitespace characters.', () => {
    expect(
        ['\t', '\v', '\n', '\r', ' ']
            .map(char => new Character(char))
            .map(char => char.isWhitespace())
    ).not.toContain(false);
    expect(
        ['a', 'b', 'c', 'd', '(', '\'', ')', '.']
            .map(char => new Character(char))
            .map(char => char.isWhitespace())
    ).not.toContain(true);
});

test('Character: correctly detects opening bracket.', () => {
    expect(new Character('(').isOpeningBracket()).toBeTruthy();
    expect(new Character('a').isOpeningBracket()).toBeFalsy();
    expect(new Character(')').isOpeningBracket()).toBeFalsy();
});

test('Character: correctly detects closing bracket.', () => {
    expect(new Character(')').isClosingBracket()).toBeTruthy();
    expect(new Character('a').isClosingBracket()).toBeFalsy();
    expect(new Character('(').isClosingBracket()).toBeFalsy();
});

test('Character: correctly splits string.', () => {
    expect(Character.splitString('')).toEqual([]);
    expect(Character.splitString('a')).toEqual([new Character('a')]);
    expect(Character.splitString('ab')).toEqual([new Character('a'), new Character('b')]);
});

