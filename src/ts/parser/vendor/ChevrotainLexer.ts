import {Lexer, TokenType} from 'chevrotain';

export default class ChevrotainLexer extends Lexer {
    constructor(tokenList: TokenType[]) {
        super(tokenList);
    }
}
