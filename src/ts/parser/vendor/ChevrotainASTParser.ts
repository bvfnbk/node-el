import {ASTNode, ASTNumberLiteralNode, ASTStringLiteralNode} from '../ast';
import LexerTokens from './LexerTokens';
import {CstNode, IToken, TokenType} from 'chevrotain';
import ExpressionLanguageParser from '../ExpressionLanguageParser';
import TokenNameMap from './TokenNameMap';
import ChevrotainLexer from './ChevrotainLexer';
import ChevrotainCstParser from './ChevrotainCstParser';
import ParserRules from './ParserRules';
import ASTIdentifierNode from '../ast/ASTIdentifierNode';
import ParserError from '../ParserError';
import ASTUnderscoreNode from '../ast/ASTUnderscoreNode';

type CstChildrenDict = { [key: string]: CstNode | CstNode[] };
type CstTokenDict = { [key: string]: IToken[] };

function getParserRule(context: CstChildrenDict): ParserRules {
    if (Object.prototype.hasOwnProperty.call(context, ParserRules.NUMBER_LITERAL)) {
        return ParserRules.NUMBER_LITERAL;
    } else if (Object.prototype.hasOwnProperty.call(context, ParserRules.STRING_LITERAL)) {
        return ParserRules.STRING_LITERAL;
    } else if (Object.prototype.hasOwnProperty.call(context, ParserRules.IDENTIFIER)) {
        return ParserRules.IDENTIFIER;
    } else if (Object.prototype.hasOwnProperty.call(context, ParserRules.UNDERSCORE)) {
        return ParserRules.UNDERSCORE;
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
                if (Object.prototype.hasOwnProperty.call(context, ParserRules.DOUBLE_QUOTED_STRING_LITERAL)) {
                    return this.visit(context[ParserRules.DOUBLE_QUOTED_STRING_LITERAL]);
                } else if (Object.prototype.hasOwnProperty.call(context, ParserRules.SINGLE_QUOTED_STRING_LITERAL)) {
                    return this.visit(context[ParserRules.SINGLE_QUOTED_STRING_LITERAL]);
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            doubleQuotedStringLiteralRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerTokens.DOUBLE_QUOTED_STRING_LITERAL)) {
                    let contextElement: IToken[] = context[LexerTokens.DOUBLE_QUOTED_STRING_LITERAL];
                    const value = contextElement[0].image;
                    return new ASTStringLiteralNode(value.slice(1, value.length - 1));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            singleQuotedStringLiteralRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerTokens.SINGLE_QUOTED_STRING_LITERAL)) {
                    const value = context[LexerTokens.SINGLE_QUOTED_STRING_LITERAL][0].image;
                    return new ASTStringLiteralNode(value.slice(1, value.length - 1));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            numberLiteralRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerTokens.NUMBER_LITERAL)) {
                    return new ASTNumberLiteralNode(Number(context[LexerTokens.NUMBER_LITERAL][0].image));
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            identifierRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerTokens.IDENTIFIER)) {
                    return new ASTIdentifierNode(context[LexerTokens.IDENTIFIER][0].image);
                } else {
                    throw new Error('Failed to parse context.');
                }
            }

            underscoreRule(context: CstTokenDict): ASTNode {
                if (Object.prototype.hasOwnProperty.call(context, LexerTokens.UNDERSCORE)) {
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
