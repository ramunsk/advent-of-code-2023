import { readFileSync } from 'fs';
import { Lexer } from './support/lexer';
import { Parser } from './support/parser';

const fileContent = readFileSync('./sample.txt', { encoding: 'utf-8' });
const tokens = new Lexer(fileContent).tokenize();
// console.log(tokens.slice(0, 20).map((t) => [t.type, t.value]));

const ast = new Parser(tokens).parse();
console.dir(ast, { depth: null });
