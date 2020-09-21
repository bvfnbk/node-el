import {ASTNode} from '../ast';
import ASTNodeVisitor from './ASTNodeVisitor';

/**
 * Implement a base literal node.
 *
 * Please note: a literal node is a leaf in the AST. It must not contain other child nodes.
 */
export default abstract class ASTLiteralNode<T> implements ASTNode {
    public readonly isLeaf = true;

    protected constructor(public readonly content: T) {
    }

    public abstract accept(visitor: ASTNodeVisitor): string;
}
