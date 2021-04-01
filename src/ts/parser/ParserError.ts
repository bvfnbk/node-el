import ASTNode from './ast/ASTNode';

export default class ParserError extends Error {
    constructor(public readonly message: string, public readonly nodes: ASTNode[]) {
        super(message);
    }
}
