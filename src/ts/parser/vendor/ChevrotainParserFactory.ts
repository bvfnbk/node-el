import ParserFactory from '../ParserFactory';
import ExpressionLanguageParser from '../ExpressionLanguageParser';
import {createToken, TokenType} from 'chevrotain';
import TokenNameMap from './TokenNameMap';
import ChevrotainASTParser from './ChevrotainASTParser';

export default class ChevrotainParserFactory implements ParserFactory {
    create(): ExpressionLanguageParser {
        const tokens = [
            createToken({
                name: 'DoubleQuotedStringLiteralToken',
                pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
            }),
            createToken({
                name: 'SingleQuotedStringLiteralToken',
                pattern: /'(:?[^\\']|\\(:?[bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/
            }),
            createToken({
                name: 'NumberLiteralToken',
                pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
            })
        ];

        const tokenMap = tokens.reduce(
            (acc: TokenNameMap, next: TokenType) => {
                acc[next.name] = next;
                return acc;
            },
            {}
        );

        return new ChevrotainASTParser(tokens, tokenMap);
    }
}
