import { readFileSync } from 'fs';
import { createMap } from './map';
const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });

const map = createMap(fileContent);
// console.dir(map, { depth: null });
const moves = map.walk();
console.log('Total moves:', moves);
