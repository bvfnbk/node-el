import ASTNode from './ASTNode';
import ASTStringLiteralNode from './ASTStringLiteralNode';
import ASTNumberLiteralNode from './ASTNumberLiteralNode';

export default interface ASTNodeVisitor {
    visit(node: ASTNode): string;

    visitString(node: ASTStringLiteralNode): string;

    visitNumber(node: ASTNumberLiteralNode): string;
}
