import { Lexer } from './lexer';
import { Parser } from './parser';

describe('Parser', () => {
    it('should parse Game record correctly', () => {
        const gameRecord = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
        const tokens = new Lexer(gameRecord).tokenize();
        const result = new Parser(tokens).parse();

        expect(result.isOk()).toBe(true);
    });
});
