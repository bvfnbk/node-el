import {ASTNode} from './ast';


/**
 * An interface for the expression language parser.
 */
export default interface ExpressionLanguageParser {
    /**
     * Parses the given expression to a single AST node.
     *
     * @param expression The expression to be parsed.
     */
    parse(expression: string): ASTNode;
}
