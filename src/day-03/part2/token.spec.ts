import { describe, expect, it } from 'vitest';
import { Token } from './token';

describe('Token', () => {
    it('should have provided values after creation', () => {
        const token = new Token('symbol', '$', 5);
        expect(token.type).toBe('symbol');
        expect(token.value).toBe('$');
        expect(token.start).toBe(5);
        expect(token.end).toBe(5);
    });

    it('should append value correctly', () => {
        const token = new Token('whitespace', '.', 5);
        token.appendValue('.');
        expect(token.value).toBe('..');
        expect(token.end).toBe(6);
        token.appendValue('123');
        expect(token.value).toBe('..123');
        expect(token.end).toBe(9);
    });
});
