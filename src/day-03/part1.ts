import { readFileSync } from 'fs';

// interface _Range {
//     start: number;
//     end: number;
// }

export function scanLine(line: string, _previousLine: string | undefined, _nextLine: string | undefined): number {
    let i = 0;
    let num = '';
    let numbers: number[] = [];

    while (i < line.length) {
        const char = line.charAt(i);
        if (char >= '0' && char <= '9') {
            num += char;
        } else {
            if (num !== '') {
                numbers.push(Number(num));
                num = '';
            }
        }
        i++;
    }

    console.log(numbers);

    return 0;
}

const fileContent = readFileSync('./sample.txt', { encoding: 'utf-8' });
