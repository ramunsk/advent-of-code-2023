import { describe, expect, it } from 'vitest';
import { Range } from './range';

describe('Range', () => {
    it('should have provided values after creation', () => {
        const range = new Range(0, 10);
        expect(range.start).toBe(0);
        expect(range.end).toBe(10);
    });

    it('should should be converted to string correctly', () => {
        const range = new Range(25, 30);
        expect(range.toString()).toBe('25-30');
    });

    describe.only('should calculate neighbourhood correctly', () => {
        it.each`
            firstRange | secondRange | expectedResult | comment
            ${'0-5'}   | ${'10-20'}  | ${false}       | ${'first before second'}
            ${'0-9'}   | ${'10-20'}  | ${true}        | ${'first touches second'}
            ${'0-15'}  | ${'10-20'}  | ${true}        | ${'first overlaps second'}
            ${'0-20'}  | ${'10-20'}  | ${true}        | ${'first overlaps second to the end'}
            ${'0-30'}  | ${'10-20'}  | ${true}        | ${'first overlaps second beyond the end'}
            ${'10-30'} | ${'10-20'}  | ${true}        | ${'first overlaps second from start'}
            ${'15-30'} | ${'10-20'}  | ${true}        | ${'first overlaps second from middle'}
            ${'20-30'} | ${'10-20'}  | ${true}        | ${'first overlaps second on tail'}
            ${'21-30'} | ${'10-20'}  | ${true}        | ${'second touches first'}
            ${'22-30'} | ${'10-20'}  | ${false}       | ${'second before first'}
        `('$firstRange | $secondRange -> $expectedResult ($comment)', ({ firstRange, secondRange, expectedResult }) => {
            let [start, end] = firstRange.split('-');
            const first = new Range(Number(start), Number(end));
            [start, end] = secondRange.split('-');
            const second = new Range(Number(start), Number(end));
            expect(first.isBorderingWith(second)).toBe(expectedResult);
            expect(second.isBorderingWith(first)).toBe(expectedResult);
        });
    });

    describe.only('should calculate neighbourhood of singular ranges correctly', () => {
        it.each`
            firstRange | secondRange | expectedResult | comment
            ${'0-0'}   | ${'10-10'}  | ${false}       | ${'first before second'}
            ${'9-9'}   | ${'10-10'}  | ${true}        | ${'first touches second'}
            ${'10-10'} | ${'10-10'}  | ${true}        | ${'first overlaps second'}
            ${'11-11'} | ${'10-10'}  | ${true}        | ${'second touches first'}
            ${'20-20'} | ${'10-10'}  | ${false}       | ${'second beyond first'}
        `('$firstRange | $secondRange -> $expectedResult ($comment)', ({ firstRange, secondRange, expectedResult }) => {
            let [start, end] = firstRange.split('-');
            const first = new Range(Number(start), Number(end));
            [start, end] = secondRange.split('-');
            const second = new Range(Number(start), Number(end));
            expect(first.isBorderingWith(second)).toBe(expectedResult);
            expect(second.isBorderingWith(first)).toBe(expectedResult);
        });
    });
});
