import {ASTNodeVisitor} from './ast';
import ExpressionLanguageParser from './ExpressionLanguageParser';
import ChevrotainParserFactory from './vendor/ChevrotainParserFactory';
import DefaultASTVisitor from './DefaultASTVisitor';


/**
 * Creates the expression language parser.
 */
function createParser(): ExpressionLanguageParser {
    const parserFactory = new ChevrotainParserFactory();
    return parserFactory.create();
}

/**
 * Creates the (default) AST node visitor.
 */
function createVisitor(): ASTNodeVisitor {
    return new DefaultASTVisitor();
}

export {
    createParser,
    createVisitor
};
