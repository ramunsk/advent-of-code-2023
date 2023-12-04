import { readFileSync } from 'fs';
import { scanLine } from './scan-line';

const fileContent = readFileSync('./input.txt', { encoding: 'utf-8' });
const lines = fileContent.split('\n');
console.log('Number of lines:', lines.length);
let total = 0;

for (let i = 0; i < lines.length; i++) {
    const [prev, current, next] = [lines[i - 1], lines[i], lines[i + 1]];

    // console.log('---------------------------------');
    // console.log(prev);
    // console.log(current);
    // console.log(next);
    // console.log('---------------------------------');

    const sum = scanLine(current, prev, next);
    // console.log(sum);
    total += sum;
}

console.log('Total is:', total);
// 498906 is too low :\
// 530537 is too low :\
