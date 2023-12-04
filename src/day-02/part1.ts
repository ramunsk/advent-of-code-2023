import { readFileSync } from 'fs';
import { Lexer } from './support/lexer';
import { logParserError } from './support/log-parser-error';
import { CubeColor, DrawResult, Parser } from './support/parser';

const fileContent = readFileSync('./input.txt', { encoding: 'utf-8' });
const tokens = new Lexer(fileContent).tokenize();
// console.log(tokens.slice(0, 20).map((t) => [t.type, t.value, t.column]));

const gameLog = new Parser(tokens).parse();
if (gameLog.isFailure()) {
    logParserError(fileContent, gameLog.error);
    process.exit(1);
}
// console.dir(gameLog.value, { depth: null });

type AggregatedDrawResults = Record<CubeColor, number>;

const getDrawResults = (drawDrawResult: DrawResult): AggregatedDrawResults => {
    const results: AggregatedDrawResults = { red: 0, green: 0, blue: 0 };
    drawDrawResult.cubesDrawn.forEach((cubeDraw) => {
        results[cubeDraw.color] = cubeDraw.amount;
    });
    return results;
};

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

let sum = 0;

gameLog.value.games.forEach((game) => {
    const gameId = game.gameId;
    let possible = true;

    for (let i = 0; i < game.draws.length; i++) {
        const results = getDrawResults(game.draws[i]);
        if (results.red > maxRed || results.green > maxGreen || results.blue > maxBlue) {
            possible = false;
        }
        if (!possible) {
            break;
        }
    }

    if (possible) {
        sum += gameId;
    }
});

console.log('Result is:', sum);
