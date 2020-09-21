import {ASTNode, ASTNumberLiteralNode, ASTStringLiteralNode} from '../ast';
import Token from '../Token';
import {TokenType} from 'chevrotain';
import ExpressionLanguageParser from '../ExpressionLanguageParser';
import TokenNameMap from './TokenNameMap';
import ChevrotainLexer from './ChevrotainLexer';
import ChevrotainCstParser from './ChevrotainCstParser';

export default class ChevrotainASTParser implements ExpressionLanguageParser {
    private readonly lexer: ChevrotainLexer;
    private readonly parser: ChevrotainCstParser;
    private readonly visitor: any;

    constructor(tokenList: TokenType[], tokenMap: TokenNameMap) {
        this.lexer = new ChevrotainLexer(tokenList);
        this.parser = new ChevrotainCstParser(tokenList, tokenMap);
        this.visitor = new class extends this.parser.getBaseCstVisitorConstructor() {
            constructor() {
                super();
                this.validateVisitor();
            }

            expression(context: any): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, 'numberLiteral')) {
                    return this.visit(context.numberLiteral);
                } else if (Object.prototype.hasOwnProperty.call(context, 'stringLiteral')) {
                    return this.visit(context.stringLiteral);
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            stringLiteral(context: any): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, 'doubleQuotedStringLiteral')) {
                    return this.visit(context.doubleQuotedStringLiteral);
                } else if (Object.prototype.hasOwnProperty.call(context, 'singleQuotedStringLiteral')) {
                    return this.visit(context.singleQuotedStringLiteral);
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            doubleQuotedStringLiteral(context: any): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, Token.DoubleQuotedStringLiteral.name)) {
                    const value = context[Token.DoubleQuotedStringLiteral.name][0].image;
                    return new ASTStringLiteralNode(value.slice(1, value.length - 1));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            singleQuotedStringLiteral(context: any): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, Token.SingleQuotedStringLiteral.name)) {
                    const value = context[Token.SingleQuotedStringLiteral.name][0].image;
                    return new ASTStringLiteralNode(value.slice(1, value.length - 1));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            numberLiteral(context: any): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, Token.NumberLiteral.name)) {
                    return new ASTNumberLiteralNode(Number(context[Token.NumberLiteral.name][0].image));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }
        };
    }

    parse(expression: string): ASTNode {
        const lexerResult = this.lexer.tokenize(expression);
        this.parser.input = lexerResult.tokens;
        return this.visitor.visit(this.parser.expression());
    }
}
