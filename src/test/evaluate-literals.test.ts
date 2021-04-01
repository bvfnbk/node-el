import {evaluate} from '../ts';


describe('Evaluating literals...', () => {
    test('Double quoted string literals are correctly evaluated.', () => {
        expect(evaluate('"a string literal"')).toEqual('a string literal');
    });

    test('Double quoted string literal, containing single quotes are correctly evaluated.', () => {
        expect(evaluate('"a string literal with \'single\' quote."'))
            .toEqual('a string literal with \'single\' quote.');
    });

    test.skip('Double quoted string literal, containing double quotes are correctly evaluated.', () => {
        expect(evaluate(`"a string literal with \\"double\\" quote."`))
            .toEqual('a string literal with "double" quote.');
    });

    test('Single quoted string literals are correctly evaluated.', () => {
        expect(evaluate('\'another string literal\'')).toEqual('another string literal');
    });

    test('Single quoted string literal, containing double quotes are correctly evaluated.', () => {
        expect(evaluate('\'another string literal with "double" quote.\''))
            .toEqual('another string literal with "double" quote.');
    });

    test('Number literals are correctly evaluated.', () => {
        expect(evaluate('1234')).toEqual('1234');
    });
});

