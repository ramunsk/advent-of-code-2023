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
});
