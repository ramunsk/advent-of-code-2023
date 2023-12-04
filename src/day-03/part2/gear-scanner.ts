import { Token } from './token';

interface ScannedLine {
    readonly source: string;
    readonly tokens: Token[];
}

interface GearInfo {
    token: Token;
    neighbors: Token[];
    ratio: number;
}

interface ProcessedLine {
    sourceLine: string;
    gears: GearInfo[];
}

export class GearScanner {
    private sourceLines: string[];
    private scannedLines: ScannedLine[];

    constructor(lines: string[]) {
        this.sourceLines = lines;
        this.scannedLines = [];
    }

    scan(): ScannedLine[] {
        if (this.scannedLines.length) {
            return this.scannedLines;
        }

        this.sourceLines.forEach((line) => {
            this.scanLine(line);
        });

        return this.scannedLines;
    }

    private scanLine(line: string): void {
        const tokens: Token[] = [];
        let i = 0;
        while (i < line.length) {
            const char = line.charAt(i);
            const lastToken = tokens.at(-1);

            switch (true) {
                case char >= '0' && char <= '9':
                    if (lastToken?.type === 'number') {
                        lastToken.appendValue(char);
                    } else {
                        tokens.push(new Token('number', char, i));
                    }
                    break;
                case char === '*':
                    tokens.push(new Token('gear', char, i));
                    break;
                default:
                    if (lastToken?.type === 'whitespace') {
                        lastToken.appendValue(char);
                    } else {
                        tokens.push(new Token('whitespace', char, i));
                    }
                    break;
            }
            i++;
        }
        this.scannedLines.push({ source: line, tokens });
    }

    process() {
        const scannedLines = this.scan();
        const processedLines: ProcessedLine[] = [];

        let i = 0;
        while (i < scannedLines.length) {
            const [prev, current, next] = [scannedLines[i - 1], scannedLines[i], scannedLines[i + 1]];
            processedLines.push(this.processLine(current, prev, next));
            i++;
        }

        return processedLines;
    }

    private processLine(
        line: ScannedLine,
        previous: ScannedLine | undefined,
        next: ScannedLine | undefined
    ): ProcessedLine {
        const gears = line.tokens.filter((t) => t.type === 'gear');
        const numbers = [...(previous?.tokens ?? []), ...line.tokens, ...(next?.tokens ?? [])].filter(
            (t) => t.type === 'number'
        );

        const foundGears: GearInfo[] = [];

        gears.forEach((gear) => {
            const borderingNumbers = numbers.filter((n) => gear.isBorderingWith(n));
            if (borderingNumbers.length === 2) {
                foundGears.push({
                    token: gear,
                    neighbors: borderingNumbers,
                    ratio: Number(borderingNumbers[0].value) * Number(borderingNumbers[1].value),
                });
            }
        });

        return { sourceLine: line.source, gears: foundGears };
    }
}
