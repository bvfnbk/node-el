/**
 * Enumerate available token names.
 */
enum LexerTokens {
    DOUBLE_QUOTED_STRING_LITERAL = 'DoubleQuotedStringLiteralToken',
    SINGLE_QUOTED_STRING_LITERAL = 'SingleQuotedStringLiteralToken',
    NUMBER_LITERAL = 'NumberLiteralToken',
    IDENTIFIER = 'IdentifierToken',
    UNDERSCORE = 'UnderscoreToken',
    WHITESPACE = 'WhitespaceToken'
}

export default LexerTokens;
