import { readFileSync } from 'fs';
import { parseGames } from './game';

const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });
const games = parseGames(fileContent);
games.sort((a, b) => a.hand.value.localeCompare(b.hand.value));
const winnings = games.reduce((prev, curr, i) => prev + curr.bid * (i + 1), 0);
console.log('Winnings are:', winnings);
// 250119709 is too low
// 251136060 is correct answer
