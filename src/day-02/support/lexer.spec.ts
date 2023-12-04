import { describe, expect, it } from 'vitest';
import { Lexer, TokenType } from './lexer';

describe('Lexer', () => {
    describe('should correctly tokenize', () => {
        describe('text', () => {
            const T = TokenType.Text;
            it.each`
                text                     | expectedTokens
                ${'This is simple text'} | ${[[T, 'This', 0], [T, 'is', 5], [T, 'simple', 8], [T, 'text', 15]]}
            `('$text', ({ text, expectedTokens }) => {
                const tokens = new Lexer(text).tokenize();
                expect(tokens).toHaveLength(expectedTokens.length + 1);
                expectedTokens.forEach((expectedToken: [TokenType, string, number], i: number) => {
                    expect(tokens[i].type).toBe(expectedToken[0]);
                    expect(tokens[i].value).toBe(expectedToken[1]);
                    expect(tokens[i].line).toBe(0);
                    expect(tokens[i].column).toBe(expectedToken[2]);
                });
            });
        });
        describe('number', () => {
            const N = TokenType.Number;
            it.each`
                text            | expectedTokens
                ${'1 5 12 278'} | ${[[N, '1', 0], [N, '5', 2], [N, '12', 4], [N, '278', 7]]}
            `('$text', ({ text, expectedTokens }) => {
                const tokens = new Lexer(text).tokenize();
                expect(tokens).toHaveLength(expectedTokens.length + 1);
                console.log(tokens);
                expectedTokens.forEach((expectedToken: [TokenType, string, number], i: number) => {
                    expect(tokens[i].type).toBe(expectedToken[0]);
                    expect(tokens[i].value).toBe(expectedToken[1]);
                    expect(tokens[i].line).toBe(0);
                    expect(tokens[i].column).toBe(expectedToken[2]);
                });
            });
        });
    });
});
