import {createParser} from '../ts/parser';
import ASTIdentifierNode from '../ts/parser/ast/ASTIdentifierNode';
import ParserError from '../ts/parser/ParserError';


describe('Parsing identifiers...', () => {
    const parser = createParser();
    const valid = [
        'identifier',
        'camelCase',
        'ALLUPPER',
        'PascalCase'
    ];

    const invalid = [
        'contains whitespace',
        'snake_case'
    ];

    valid.forEach(identifier => {
        test(`Parses  '${identifier}' to corresponding AST node.`, () => {
            const node = parser.parse(identifier);
            expect(node).toBeInstanceOf(ASTIdentifierNode);
            expect((node as ASTIdentifierNode).content).toEqual(identifier);
        });
    });

    invalid.forEach(identifier => {
        test(`Parsing  '${identifier}' fails.`, () => {
            expect(() => parser.parse(identifier)).toThrow(ParserError);
        });
    });
});

