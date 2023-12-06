import { readFileSync } from 'fs';
import { AlmanacScanner } from './almanac-scanner';
import { Parser } from './parser';
const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });

const [seeds, maps] = new Parser().parse(fileContent);
// console.log(seeds);
// console.dir(maps, { depth: null });

const scanner = new AlmanacScanner(seeds, maps);
const location = scanner.scan();
console.log(`Nearest location is: ${location}`);

// 289863851 is correct answer
