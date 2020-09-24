import ASTLiteralNode from './ASTLiteralNode';
import ASTNodeVisitor from './ASTNodeVisitor';

/**
 * A string literal.
 */
export default class ASTStringLiteralNode extends ASTLiteralNode<string> {
    constructor(content: string) {
        super(content);
    }

    public accept(visitor: ASTNodeVisitor): string {
        return visitor.visitString(this);
    }
}
