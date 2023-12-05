import { readFileSync } from 'fs';
import { CardParser } from './card-parser';

const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });
const cards = new CardParser().parse(fileContent);

const pile: Record<number, number> = {};
cards.forEach((c) => {
    pile[c.id] = 1;
});

Object.keys(pile).forEach((cId) => {
    const cardId = Number(cId);
    const card = cards.find((c) => c.id === cardId);
    const luckyNumberCount = card!.luckyNumberCount;
    Array.from({ length: luckyNumberCount }, (_, i) => i + cardId + 1).forEach((n) => {
        pile[n] += pile[cardId];
    });
});

const total = Object.values(pile).reduce((p, c) => p + c, 0);

console.log('Total is:', total);

// 8172507 is correct answer
