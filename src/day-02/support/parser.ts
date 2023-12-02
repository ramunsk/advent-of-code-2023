import { Token } from './lexer';

export const enum AstNodeKind {
    GameLog = 'GameLog',
    GameResult = 'GameResult',
    DrawResult = 'DrawResult',
    CubeResult = 'CubeResult',
}

export const enum CubeColor {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}

abstract class AstNode {
    readonly kind: AstNodeKind;

    constructor(kind: AstNodeKind) {
        this.kind = kind;
    }
}

export class GameLog extends AstNode {
    readonly games: GameResult[];

    constructor(...games: GameResult[]) {
        super(AstNodeKind.GameLog);
        this.games = games ?? [];
    }
}

export class GameResult extends AstNode {
    readonly draws: DrawResult[];

    constructor(...draws: DrawResult[]) {
        super(AstNodeKind.GameResult);
        this.draws = draws;
    }
}

export class DrawResult extends AstNode {
    readonly cubeDrawn: CubeResult[];

    constructor(...draws: CubeResult[]) {
        super(AstNodeKind.DrawResult);
        this.cubeDrawn = draws;
    }
}

export class CubeResult extends AstNode {
    readonly amount: number;

    constructor(amount: number) {
        super(AstNodeKind.CubeResult);
        this.amount = amount;
    }
}

export interface ParserError {
    expected: string;
    found: string;
    column: number;
    line: number;
}

export class Parser {
    #tokens: Token[];
    #position: number;

    constructor(tokens: Token[]) {
        this.#tokens = tokens;
        this.#position = 0;
    }

    parse(): GameLog {
        return this.#gameLog();
    }

    #gameLog(): GameLog {
        return new GameLog(...this.#gameResults());
    }

    #gameResults(): GameResult[] {
        return [this.#gameResult()];
    }

    #gameResult(): GameResult {
        return new GameResult(...this.#drawResults());
    }

    #drawResults(): DrawResult[] {
        return [this.#drawResult()];
    }

    #drawResult(): DrawResult {
        return new DrawResult(...this.#cubeResults());
    }

    #cubeResults(): CubeResult[] {
        return [this.#cubeResult()];
    }

    #cubeResult(): CubeResult {
        return new CubeResult(this.#positiveNumber());
    }

    #positiveNumber(): number {
        return 1;
    }

    get #currentToken(): Token {
        return this.#tokens.at(this.#position)!;
    }

    // @ts-expect-error
    #advance(): void {
        if (this.#currentToken.type === 'EOF') {
            return;
        }
        this.#position++;
    }
}
