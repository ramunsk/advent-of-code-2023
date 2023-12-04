import { describe, expect, it } from 'vitest';
import { scanLine } from './scan-line';

describe('aa', () => {
    it('', () => {
        const line =
            '....555...............*......%...............980.+43..=..239..........*......495................638.111.........*490...124...*........576...';
        const r = scanLine(line, undefined, undefined);
        expect(r).toBe(533);
    });
});
