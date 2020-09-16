import {evaluate} from '../ts';

test('Double quoted string literals are correctly evaluated.', () => {
    expect(evaluate('"a string literal"')).toEqual('a string literal');
});

test('Single quoted string literals are correctly evaluated.', () => {
    expect(evaluate('\'another string literal\'')).toEqual('another string literal');
});

test('Number literals are correctly evaluated.', () => {
    expect(evaluate('1234')).toEqual('1234');
});
