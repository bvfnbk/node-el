import {evaluate} from '../ts';

test('String literals are correctly evaluated.', () => {
    expect(evaluate('"literal"')).toEqual('literal');
    expect(evaluate('\'literal\'')).toEqual('literal');
});

test('Number literals are correctly evaluated.', () => {
    expect(evaluate('1234')).toEqual('1234');
});
