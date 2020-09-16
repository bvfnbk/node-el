import {ExpressionLanguageParser, tokenList} from './grammar';
import {Lexer} from 'chevrotain';

const parser = new ExpressionLanguageParser(tokenList);
const lexer = new Lexer(tokenList);

const ExpressionLanguageParserVisitor = parser.getBaseCstVisitorConstructor();

class myCustomVisitor extends ExpressionLanguageParserVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    expression(context: any): string {
        if (Object.prototype.hasOwnProperty.call(context, 'numberLiteral')) {
            return this.visit(context.numberLiteral);
        } else if (Object.prototype.hasOwnProperty.call(context, 'stringLiteral')) {
            return this.visit(context.stringLiteral);
        } else {
            return '';
        }
    }

    stringLiteral(context: any): string {
        if (Object.prototype.hasOwnProperty.call(context, 'doubleQuotedStringLiteral')) {
            return this.visit(context.doubleQuotedStringLiteral);
        } else if (Object.prototype.hasOwnProperty.call(context, 'singleQuotedStringLiteral')) {
            return this.visit(context.singleQuotedStringLiteral);
        } else {
            return '';
        }
    }

    doubleQuotedStringLiteral(context: any): string {
        if (Object.prototype.hasOwnProperty.call(context, 'DoubleQuotedStringLiteral')) {
            const value = context.DoubleQuotedStringLiteral[0].image;
            return value.slice(1, value.length - 1);
        } else {
            return '';
        }
    }

    singleQuotedStringLiteral(context: any): string {
        if (Object.prototype.hasOwnProperty.call(context, 'SingleQuotedStringLiteral')) {
            const value = context.SingleQuotedStringLiteral[0].image;
            return value.slice(1, value.length - 1);
        } else {
            return '';
        }
    }

    numberLiteral(context: any): string {
        if (Object.prototype.hasOwnProperty.call(context, 'NumberLiteral')) {
            return context.NumberLiteral[0].image;
        } else {
            return '';
        }
    }
}

const visitor = new myCustomVisitor();

function evaluate(expression: string): string {
    const lexerResult = lexer.tokenize(expression);

    parser.input = lexerResult.tokens;

    const cst = parser.expression();

    if (parser.errors.length > 0) {
        throw Error(
            'Sad sad panda, parsing errors detected!\n' +
            parser.errors[0].message
        );
    }

    return visitor.visit(cst);
}

export {
    evaluate
};
