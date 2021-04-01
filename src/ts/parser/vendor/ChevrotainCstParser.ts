import {CstParser, TokenType} from 'chevrotain';
import TokenNameMap from './TokenNameMap';
import LexerToken from './LexerToken';
import ParserRule from './ParserRule';

export default class ChevrotainCstParser extends CstParser {
    constructor(tokenList: TokenType[], private readonly tokenMap: TokenNameMap) {
        super(tokenList);
        this.performSelfAnalysis();
    }

    public expression = this.RULE(ParserRule.EXPRESSION, () => {
        this.MANY(() => {
            this.OR([
                {ALT: () => this.SUBRULE(this.identifier)},
                {ALT: () => this.SUBRULE(this.underscore)},
                {ALT: () => this.SUBRULE(this.stringLiteral)},
                {ALT: () => this.SUBRULE(this.numberLiteral)}
            ]);
        });
    });

    public stringLiteral = this.RULE(ParserRule.STRING_LITERAL, () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.doubleQuotedStringLiteral)},
            {ALT: () => this.SUBRULE(this.singleQuotedStringLiteral)}
        ]);
    });

    public doubleQuotedStringLiteral = this.RULE(ParserRule.DOUBLE_QUOTED_STRING_LITERAL, () => {
        this.CONSUME(this.tokenMap[LexerToken.DOUBLE_QUOTED_STRING_LITERAL]);
    });

    public singleQuotedStringLiteral = this.RULE(ParserRule.SINGLE_QUOTED_STRING_LITERAL, () => {
        this.CONSUME(this.tokenMap[LexerToken.SINGLE_QUOTED_STRING_LITERAL]);
    });

    public numberLiteral = this.RULE(ParserRule.NUMBER_LITERAL, () => {
        this.CONSUME(this.tokenMap[LexerToken.NUMBER_LITERAL]);
    });

    public identifier = this.RULE(ParserRule.IDENTIFIER, () => {
        this.CONSUME(this.tokenMap[LexerToken.IDENTIFIER]);
    });

    public underscore = this.RULE(ParserRule.UNDERSCORE, () => {
        this.CONSUME(this.tokenMap[LexerToken.UNDERSCORE]);
    });
}
