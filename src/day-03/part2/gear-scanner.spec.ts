import { describe, expect, it } from 'vitest';
import { GearScanner } from './gear-scanner';
import { TokenType } from './token';

describe('GearScanner', () => {
    describe('when scanning should', () => {
        it('produce correct number of scanned lines', () => {
            const scanner = new GearScanner('.....'.split(''));
            const scannedLines = scanner.scan();
            expect(scannedLines).toHaveLength(5);
        });

        describe('should produce correct tokens for scanned line', () => {
            it.each`
                line         | tokenInfos
                ${'...'}     | ${[['whitespace', '...', 0]]}
                ${'.$.'}     | ${[['whitespace', '.$.', 0]]}
                ${'123'}     | ${[['number', '123', 0]]}
                ${'**'}      | ${[['gear', '*', 0], ['gear', '*', 1]]}
                ${'.*12..*'} | ${[['whitespace', '.', 0], ['gear', '*', 1], ['number', '12', 2], ['whitespace', '..', 4], ['gear', '*', 6]]}
            `('$line', ({ line, tokenInfos }) => {
                const scanner = new GearScanner([line]);
                const [scannedLine] = scanner.scan();
                expect(scannedLine.tokens).toHaveLength(tokenInfos.length);
                tokenInfos.forEach((tokenInfo: [TokenType, string, number], i: number) => {
                    const scannedToken = scannedLine.tokens[i];
                    const [expectedTokenType, expectedTokenValue, expectedTokenStart] = tokenInfo;
                    expect(scannedToken.type).toBe(expectedTokenType);
                    expect(scannedToken.value).toBe(expectedTokenValue);
                    expect(scannedToken.start).toBe(expectedTokenStart);
                });
            });
        });
    });
});
