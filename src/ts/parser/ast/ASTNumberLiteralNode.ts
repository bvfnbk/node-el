import ASTLiteralNode from './ASTLiteralNode';
import ASTNodeVisitor from './ASTNodeVisitor';

/**
 * A number literal.
 */
export default class ASTNumberLiteralNode extends ASTLiteralNode<number> {
    constructor(content: number) {
        super(content);
    }

    accept(visitor: ASTNodeVisitor): string {
        return visitor.visitNumber(this);
    }
}
