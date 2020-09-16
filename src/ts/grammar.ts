import {createToken, CstParser, TokenType} from 'chevrotain';

const DoubleQuotedStringLiteral = createToken({
    name: 'DoubleQuotedStringLiteral',
    pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
});

const SingleQuotedStringLiteral = createToken({
    name: 'SingleQuotedStringLiteral',
    pattern: /'(:?[^\\']|\\(:?[bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/
});

const NumberLiteral = createToken({
    name: 'NumberLiteral',
    pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
});

const tokenList: TokenType[] = [
    DoubleQuotedStringLiteral,
    SingleQuotedStringLiteral,
    NumberLiteral
];


class ExpressionLanguageParser extends CstParser {
    constructor(tokenList: TokenType[]) {
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
        this.CONSUME(DoubleQuotedStringLiteral);
    });

    public singleQuotedStringLiteral = this.RULE('singleQuotedStringLiteral', () => {
        this.CONSUME(SingleQuotedStringLiteral);
    });

    public numberLiteral = this.RULE('numberLiteral', () => {
        this.CONSUME(NumberLiteral);
    });
}

export {
    DoubleQuotedStringLiteral,
    NumberLiteral,
    tokenList,
    ExpressionLanguageParser,
};
