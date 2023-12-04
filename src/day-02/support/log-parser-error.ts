import { ParserError } from './parser';

export function logParserError(source: string, error: ParserError): void {
    const lines = source.split('\n');
    const line = lines.at(error.found.line);
    const pointer = '▲'.padStart(error.found.column + 1, ' ');
    const message = `Expected ${error.expected}, found "${error.found.value}" at line ${error.found.line + 1}, column ${
        error.found.column + 1
    }`;
    console.log(line);
    console.error(pointer);
    console.error(message);
}
