import { readFileSync } from 'fs';
import { Lexer } from './support/lexer';
import { Parser, ParserError } from './support/parser';

function logParserError(source: string, error: ParserError): void {
    const lines = source.split('\n');
    const line = lines.at(error.found.line);
    const pointer = '^'.padStart(error.found.column + 1, '-');
    const message = `Expected ${error.expected}, found "${error.found.value}" at line ${error.found.line + 1}, column ${
        error.found.column + 1
    }`;
    console.error(line);
    console.error(pointer);
    console.error(message);
}

const fileContent = readFileSync('./sample.txt', { encoding: 'utf-8' });
const tokens = new Lexer(fileContent).tokenize();
// console.log(tokens.slice(0, 20).map((t) => [t.type, t.value]));

const ast = new Parser(tokens).parse();
if (ast.isFailure()) {
    logParserError(fileContent, ast.error);
    process.exit(1);
}
console.dir(ast.value, { depth: null });
