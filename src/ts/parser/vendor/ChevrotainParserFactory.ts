import ParserFactory from '../ParserFactory';
import ExpressionLanguageParser from '../ExpressionLanguageParser';
import {createToken, Lexer, TokenType} from 'chevrotain';
import TokenNameMap from './TokenNameMap';
import ChevrotainASTParser from './ChevrotainASTParser';
import LexerTokens from './LexerTokens';

export default class ChevrotainParserFactory implements ParserFactory {
    create(): ExpressionLanguageParser {
        const tokens = [
            createToken({
                name: LexerTokens.DOUBLE_QUOTED_STRING_LITERAL,
                pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
            }),
            createToken({
                name: LexerTokens.SINGLE_QUOTED_STRING_LITERAL,
                pattern: /'(:?[^\\']|\\(:?[bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/
            }),
            createToken({
                name: LexerTokens.NUMBER_LITERAL,
                pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
            }),
            createToken({
                name: LexerTokens.IDENTIFIER,
                pattern: /[a-zA-Z]+/
            }),
            createToken({
                name: LexerTokens.UNDERSCORE,
                pattern: /_/
            }),
            createToken({
                name: LexerTokens.WHITESPACE,
                pattern: /\s+/,
                group: Lexer.SKIPPED
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
