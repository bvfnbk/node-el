export default class Token {
    public static readonly DoubleQuotedStringLiteral = new Token(
        'DoubleQuotedStringLiteralToken',
        /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
    );

    public static readonly SingleQuotedStringLiteral = new Token(
        'SingleQuotedStringLiteralToken',
        /'(:?[^\\']|\\(:?[bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/
    );

    public static readonly NumberLiteral = new Token(
        'NumberLiteralToken',
        /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
    );

    public static all(): Token[] {
        return [
            Token.DoubleQuotedStringLiteral,
            Token.SingleQuotedStringLiteral,
            Token.NumberLiteral
        ];
    }

    private constructor(public readonly name: string,
                        public readonly pattern: RegExp) {
    }
}
