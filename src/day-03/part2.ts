import chalk from 'chalk';
import { readFileSync } from 'fs';
import { GearScanner } from './part2/gear-scanner';

const fileContent = readFileSync('./input.txt', { encoding: 'utf-8' });
const lines = fileContent.split('\n');
console.log('Number of lines:', lines.length);

const scanner = new GearScanner(lines);
// const scannedLines = scanner.scan();
// console.dir(scannedLines, { depth: null });

const processedLines = scanner.process();
let total = 0;
processedLines.forEach((line) => {
    const source = chalk.green(line.sourceLine);
    const gears = chalk.yellow(
        line.gears
            .map((g) => `@${g.token.start} (${g.neighbors.map((n) => n.value).join(' + ')} = ${g.ratio})`)
            .join(', ')
    );
    console.log(`${source}\n${gears}`);
    total += line.gears.reduce((prev, current) => prev + current.ratio, 0);
});
console.log('Total gear ratio:', total);
// 83279367 is the correct number :)
