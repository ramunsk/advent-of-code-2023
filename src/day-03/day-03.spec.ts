import { scanLine } from './part1';

describe('scanLine', () => {
    it('should return 0 if line has no numbers', () => {
        const result = scanLine('.....%..$.@..', undefined, undefined);
        expect(result).toBe(0);
    });
    describe('when previous line is missing', () => {
        it('01', () => {
            const [prev, current, next] = [
                undefined, // prev
                '.......', // current
                '......', // next
            ];

            const result = scanLine(current, prev, next);
            expect(result).toBe(0);
        });

        it('02', () => {
            const [prev, current, next] = [
                undefined, // prev
                '...4...', // current
                '......', // next
            ];

            const result = scanLine(current, prev, next);
            expect(result).toBe(0);
        });

        it('02', () => {
            const [prev, current, next] = [
                undefined, // prev
                '...4...', // current
                '...*..', // next
            ];

            const result = scanLine(current, prev, next);
            expect(result).toBe(4);
        });
    });
});
