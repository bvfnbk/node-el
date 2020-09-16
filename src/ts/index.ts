function isStringLiteral(expression: string): boolean {
    const matchesDoubleQuote = expression.match(/^"\w*"$/) !== null;
    const matchesSingleQuote = expression.match(/^'\w*'$/) !== null;

    return matchesDoubleQuote || matchesSingleQuote;
}

function evaluate(expression: string): string {
    if (isStringLiteral(expression)) {
        return expression.slice(1, expression.length - 1);
    }
    return expression;
}

export {
    evaluate
};
