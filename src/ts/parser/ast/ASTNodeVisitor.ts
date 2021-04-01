import ASTNode from './ASTNode';
import ASTStringLiteralNode from './ASTStringLiteralNode';
import ASTNumberLiteralNode from './ASTNumberLiteralNode';
import ASTIdentifierNode from './ASTIdentifierNode';
import ASTUnderscoreNode from './ASTUnderscoreNode';

export default interface ASTNodeVisitor {
    visit(node: ASTNode): string;

    visitString(node: ASTStringLiteralNode): string;

    visitNumber(node: ASTNumberLiteralNode): string;

    visitIdentifier(node: ASTIdentifierNode): string;

    visitUnderscore(node: ASTUnderscoreNode): string;
}
