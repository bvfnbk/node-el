import {CstParser, TokenType} from 'chevrotain';
import TokenNameMap from './TokenNameMap';
import LexerTokens from './LexerTokens';
import ParserRules from './ParserRules';

export default class ChevrotainCstParser extends CstParser {
    constructor(tokenList: TokenType[], private readonly tokenMap: TokenNameMap) {
        super(tokenList);
        this.performSelfAnalysis();
    }

    public expression = this.RULE(ParserRules.EXPRESSION, () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.stringLiteral)},
            {ALT: () => this.SUBRULE(this.numberLiteral)}
        ]);
    });

    public stringLiteral = this.RULE(ParserRules.STRING_LITERAL, () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.doubleQuotedStringLiteral)},
            {ALT: () => this.SUBRULE(this.singleQuotedStringLiteral)}
        ]);
    });

    public doubleQuotedStringLiteral = this.RULE(ParserRules.DOUBLE_QUOTED_STRING_LITERAL, () => {
        this.CONSUME(this.tokenMap[LexerTokens.DOUBLE_QUOTED_STRING_LITERAL]);
    });

    public singleQuotedStringLiteral = this.RULE(ParserRules.SINGLE_QUOTED_STRING_LITERAL, () => {
        this.CONSUME(this.tokenMap[LexerTokens.SINGLE_QUOTED_STRING_LITERAL]);
    });

    public numberLiteral = this.RULE(ParserRules.NUMBER_LITERAL, () => {
        this.CONSUME(this.tokenMap[LexerTokens.NUMBER_LITERAL]);
    });
}
