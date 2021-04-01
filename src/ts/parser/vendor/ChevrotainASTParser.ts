import {ASTNode, ASTNumberLiteralNode, ASTStringLiteralNode} from '../ast';
import LexerToken from './LexerToken';
import {CstNode, IToken, TokenType} from 'chevrotain';
import ExpressionLanguageParser from '../ExpressionLanguageParser';
import TokenNameMap from './TokenNameMap';
import ChevrotainLexer from './ChevrotainLexer';
import ChevrotainCstParser from './ChevrotainCstParser';
import ParserRule from './ParserRule';
import ASTIdentifierNode from '../ast/ASTIdentifierNode';
import ParserError from '../ParserError';
import ASTUnderscoreNode from '../ast/ASTUnderscoreNode';

type CstChildrenDict = { [key: string]: CstNode | CstNode[] };
type CstTokenDict = { [key: string]: IToken[] };

function getParserRule(context: CstChildrenDict): ParserRule {
    if (Object.prototype.hasOwnProperty.call(context, ParserRule.NUMBER_LITERAL)) {
        return ParserRule.NUMBER_LITERAL;
    } else if (Object.prototype.hasOwnProperty.call(context, ParserRule.STRING_LITERAL)) {
        return ParserRule.STRING_LITERAL;
    } else if (Object.prototype.hasOwnProperty.call(context, ParserRule.IDENTIFIER)) {
        return ParserRule.IDENTIFIER;
    } else if (Object.prototype.hasOwnProperty.call(context, ParserRule.UNDERSCORE)) {
        return ParserRule.UNDERSCORE;
    } else {
        throw new Error('Failed to parse context.');
    }
}

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

            expressionRule(context: CstChildrenDict): ASTNode[] {
                const rule = getParserRule(context);
                const contextElement: CstNode | CstNode[] = context[rule];

                if (Array.isArray(contextElement)) {
                    return contextElement.map(item => this.visit(item));
                } else {
                    return [this.visit(contextElement)];
                }
            }

            stringLiteralRule(context: CstChildrenDict): ASTNode {
                const rule = getParserRule(context);
                if (rule === ParserRule.DOUBLE_QUOTED_STRING_LITERAL) {
                    return this.visit(context[ParserRule.DOUBLE_QUOTED_STRING_LITERAL]);
                } else if (rule === ParserRule.SINGLE_QUOTED_STRING_LITERAL) {
                    return this.visit(context[ParserRule.SINGLE_QUOTED_STRING_LITERAL]);
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            doubleQuotedStringLiteralRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerToken.DOUBLE_QUOTED_STRING_LITERAL)) {
                    let contextElement: IToken[] = context[LexerToken.DOUBLE_QUOTED_STRING_LITERAL];
                    const value = contextElement[0].image;
                    return new ASTStringLiteralNode(value.slice(1, value.length - 1));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            singleQuotedStringLiteralRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerToken.SINGLE_QUOTED_STRING_LITERAL)) {
                    const value = context[LexerToken.SINGLE_QUOTED_STRING_LITERAL][0].image;
                    return new ASTStringLiteralNode(value.slice(1, value.length - 1));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            numberLiteralRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerToken.NUMBER_LITERAL)) {
                    return new ASTNumberLiteralNode(Number(context[LexerToken.NUMBER_LITERAL][0].image));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            identifierRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerToken.IDENTIFIER)) {
                    return new ASTIdentifierNode(context[LexerToken.IDENTIFIER][0].image);
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            underscoreRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerToken.UNDERSCORE)) {
                    return new ASTUnderscoreNode('_');
                } else {
                    throw new Error('Failed to parse context.');
                }
            }
        };
    }

    parse(expression: string): ASTNode {
        const lexerResult = this.lexer.tokenize(expression);
        this.parser.input = lexerResult.tokens;
        const nodes: ASTNode[] = this.visitor.visit(this.parser.expression());
        console.log('>>> nodes: ', nodes);
        if (nodes.length > 1) {
            throw new ParserError('Ambiguous input; expected single expression.', nodes);
        } else if (nodes.length === 0) {
            throw new ParserError('No expression parsed.', []);
        }
        return nodes[0];
    }
}
