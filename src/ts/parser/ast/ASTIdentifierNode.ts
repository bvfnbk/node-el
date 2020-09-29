import ASTNode from './ASTNode';
import {ASTNodeVisitor} from './index';

export default class ASTIdentifierNode implements ASTNode {
    public readonly isLeaf: boolean = true;

    constructor(public readonly content: string) {
    }

    accept(visitor: ASTNodeVisitor): string {
        return visitor.visitIdentifier(this);
    }
}
