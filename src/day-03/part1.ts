import { readFileSync } from 'fs';

interface NumberToken {
    readonly value: number;
    readonly start: number;
    readonly end: number;
}

const specialSymbolRx = /[^\d\.]/gm;

export function scanLine(line: string, previousLine: string | undefined, nextLine: string | undefined): number {
    let i = 0;
    let num = '';
    let numberTokens: NumberToken[] = [];

    while (i < line.length) {
        const char = line.charAt(i);
        if (char >= '0' && char <= '9') {
            num += char;
        } else {
            if (num !== '') {
                numberTokens.push({
                    value: Number(num),
                    start: i - num.length,
                    end: i - 1,
                });
                num = '';
            }
        }
        i++;
    }
    // console.log(numbers);

    let sum = 0;

    numberTokens.forEach((token, i) => {
        // console.log('Token #', i);
        // console.log('Token is:', token);
        // character before number
        let str = line.charAt(token.start - 1);
        // console.log(`-- char before: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            return;
        }

        // characters above number (including diagonal)
        str = (previousLine ?? '').slice(token.start === 0 ? 0 : token.start - 1, token.end + 2);
        // console.log(`-- chars above: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            return;
        }

        // character after number
        str = line.charAt(token.end + 1);
        // console.log(`-- char after: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            return;
        }

        // characters below number (including diagonal)
        str = (nextLine ?? '').slice(token.start === 0 ? 0 : token.start - 1, token.end + 2);
        // console.log(`-- chars below: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            return;
        }
    });

    return sum;
}

const fileContent = readFileSync('./input.txt', { encoding: 'utf-8' });
const lines = fileContent.split('\n');

let total = 0;

for (let i = 0; i < lines.length; i++) {
    const [prev, current, next] = [lines[i - 1], lines[i], lines[i + 1]];

    console.log('---------------------------------');
    console.log(prev);
    console.log(current);
    console.log(next);
    console.log('---------------------------------');

    const sum = scanLine(current, prev, next);
    console.log(sum);
    total += sum;
}

console.log('Total is:', total);

// 498906 is too low :\
