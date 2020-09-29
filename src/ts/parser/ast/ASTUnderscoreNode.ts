import ASTNode from './ASTNode';
import {ASTNodeVisitor} from './index';

export default class ASTIdentifierNode implements ASTNode {
    public readonly isLeaf: boolean = true;

    accept(visitor: ASTNodeVisitor): string {
        return visitor.visitUnderscore(this);
    }

}
