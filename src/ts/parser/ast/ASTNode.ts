/**
 * Base interface for all AST nodes.
 */
import ASTNodeVisitor from './ASTNodeVisitor';

export default interface ASTNode {
    readonly isLeaf: boolean;

    accept(visitor: ASTNodeVisitor): string;
}
