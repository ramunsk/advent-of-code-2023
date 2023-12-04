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

let sum = 0;

gameLog.value.games.forEach((game) => {
    const cubeDraws = game.draws.map((draw) => getDrawResults(draw));
    const minCubes = cubeDraws.reduce(
        (prev, curr) => ({
            red: Math.max(prev.red, curr.red),
            green: Math.max(prev.green, curr.green),
            blue: Math.max(prev.blue, curr.blue),
        }),
        { red: 0, green: 0, blue: 0 }
    );
    const power = minCubes.red * minCubes.green * minCubes.blue;
    sum += power;
});

console.log('Result is:', sum);
