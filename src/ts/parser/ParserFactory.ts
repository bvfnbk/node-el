import Token from './Token';
import ExpressionLanguageParser from './ExpressionLanguageParser';

export default interface ParserFactory {
    create(tokenList: Token[]): ExpressionLanguageParser;
}
