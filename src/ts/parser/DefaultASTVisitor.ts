import {ASTNode, ASTNodeVisitor, ASTNumberLiteralNode, ASTStringLiteralNode} from './ast';

export default class DefaultASTVisitor implements ASTNodeVisitor {
    visit(node: ASTNode): string {
        return node.accept(this);
    }

    visitNumber(node: ASTNumberLiteralNode): string {
        return node.content.toString();
    }

    visitString(node: ASTStringLiteralNode): string {
        return node.content;
    }
}
