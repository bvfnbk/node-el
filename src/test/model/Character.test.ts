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
        [ '\t', '\n', '\l', '\r', ' ']
            .map(char => new Character(char))
            .map(char => char.isWhitespace())
    ).not.toContain(false);
    expect(
        [ 'a', 'b', 'c', 'd', '(', '\'', ')', '.']
            .map(char => new Character(char))
            .map(char => char.isWhitespace())
    ).not.toContain(true);
});

