import { readFileSync } from 'fs';
import { CardParser } from './card-parser';

const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });
const cards = new CardParser().parse(fileContent);
console.log(
    'Total points:',
    cards.map((c) => c.value).reduce((p, c) => p + c, 0)
);

// 20107 is correct answer
