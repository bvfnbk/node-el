import ExpressionLanguageParser from './ExpressionLanguageParser';

export default interface ParserFactory {
    create(): ExpressionLanguageParser;
}
