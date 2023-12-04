export type TokenType = 'whitespace' | 'number' | 'gear' | 'symbol';

// interface Token {
//     type: TokenType;
//     start: number;
//     end: number;
// }

// interface ParsedLine {
//     readonly sourceLine: string;
//     readonly tokens: Token[];
// }

// export class GearScanner {
//     private readonly sourceLines: string[];
//     private readonly parsedLines: ParsedLine[];

//     constructor(lines: string[]) {
//         this.sourceLines = lines;
//         this.parsedLines = new Array<ParsedLine>(this.sourceLines.length);
//     }

//     scan() {
//         for (let i = 0; i < this.sourceLines.length; i++) {}
//     }

//     private scanLine(line: string): ParsedLine {}
// }
