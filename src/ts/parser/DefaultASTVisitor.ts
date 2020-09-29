import {ASTNode, ASTNodeVisitor, ASTNumberLiteralNode, ASTStringLiteralNode} from './ast';
import ASTIdentifierNode from './ast/ASTIdentifierNode';
import ASTUnderscoreNode from './ast/ASTUnderscoreNode';

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

    visitIdentifier(node: ASTIdentifierNode): string {
        return node.content;
    }

    visitUnderscore(node: ASTUnderscoreNode): string {
        return node.content;
    }
}
