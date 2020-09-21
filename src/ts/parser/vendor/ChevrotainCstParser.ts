import {CstParser, TokenType} from 'chevrotain';
import TokenNameMap from './TokenNameMap';
import Token from '../Token';

export default class ChevrotainCstParser extends CstParser {
    constructor(tokenList: TokenType[], private readonly tokenMap: TokenNameMap) {
        super(tokenList);
        this.performSelfAnalysis();
    }

    public expression = this.RULE('expression', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.stringLiteral)},
            {ALT: () => this.SUBRULE(this.numberLiteral)}
        ]);
    });

    public stringLiteral = this.RULE('stringLiteral', () => {
        this.OR([
            {ALT: () => this.SUBRULE(this.doubleQuotedStringLiteral)},
            {ALT: () => this.SUBRULE(this.singleQuotedStringLiteral)}
        ]);
    });

    public doubleQuotedStringLiteral = this.RULE('doubleQuotedStringLiteral', () => {
        this.CONSUME(this.tokenMap[Token.DoubleQuotedStringLiteral.name]);
    });

    public singleQuotedStringLiteral = this.RULE('singleQuotedStringLiteral', () => {
        this.CONSUME(this.tokenMap[Token.SingleQuotedStringLiteral.name]);
    });

    public numberLiteral = this.RULE('numberLiteral', () => {
        this.CONSUME(this.tokenMap[Token.NumberLiteral.name]);
    });
}
