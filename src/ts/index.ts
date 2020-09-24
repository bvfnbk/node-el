import {createParser, createVisitor} from './parser';


function evaluate(expression: string): string {
    const parser = createParser();
    const visitor = createVisitor();

    const result = parser.parse(expression);

    return visitor.visit(result);
}

export {
    evaluate
};
