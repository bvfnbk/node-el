import ParserFactory from '../ParserFactory';
import Token from '../Token';
import ExpressionLanguageParser from '../ExpressionLanguageParser';
import {createToken, TokenType} from 'chevrotain';
import TokenNameMap from './TokenNameMap';
import ChevrotainASTParser from './ChevrotainASTParser';

export default class ChevrotainParserFactory implements ParserFactory {
    create(tokenList: Token[]): ExpressionLanguageParser {
        const tokens = tokenList.map(ChevrotainParserFactory.convertToken);
        const tokenMap = ChevrotainParserFactory.groupByName(tokens);

        return new ChevrotainASTParser(tokens, tokenMap);
    }

    private static groupByName(chevrotainTokenList: TokenType[]) {
        return chevrotainTokenList.reduce(
            (acc: TokenNameMap, next: TokenType) => {
                acc[next.name] = next;
                return acc;
            },
            {}
        );
    }

    private static convertToken(token: Token): TokenType {
        return createToken({
            name: token.name,
            pattern: token.pattern
        });
    }
}
