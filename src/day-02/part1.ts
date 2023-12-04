import { readFileSync } from 'fs';
import { Lexer } from './support/lexer';
import { logParserError } from './support/log-parser-error';
import { Parser } from './support/parser';

const fileContent = readFileSync('./sample.txt', { encoding: 'utf-8' });
const tokens = new Lexer(fileContent).tokenize();
// console.log(tokens.slice(0, 20).map((t) => [t.type, t.value, t.column]));

const gameLog = new Parser(tokens).parse();
if (gameLog.isFailure()) {
    logParserError(fileContent, gameLog.error);
    process.exit(1);
}
console.dir(gameLog.value, { depth: null });
