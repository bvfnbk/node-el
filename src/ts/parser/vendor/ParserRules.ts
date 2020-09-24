/**
 * Enumerate the required parser rules.
 *
 * Please note: value format should be <code>camelCase</code> as these strings define the names of the corresponding
 * visitor methods names.
 */
enum ParserRules {
    EXPRESSION = 'expressionRule',
    STRING_LITERAL = 'stringLiteralRule',
    DOUBLE_QUOTED_STRING_LITERAL = 'doubleQuotedStringLiteralRule',
    SINGLE_QUOTED_STRING_LITERAL = 'singleQuotedStringLiteralRule',
    NUMBER_LITERAL = 'numberLiteralRule'
}

export default ParserRules;
