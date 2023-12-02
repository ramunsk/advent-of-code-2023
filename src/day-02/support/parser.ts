import { Token, TokenType } from './lexer';
import { FailureResult, Result, failure, ok } from './result';

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
    readonly cubesDrawn: CubeResult[];

    constructor(...cubesDrawn: CubeResult[]) {
        super(AstNodeKind.DrawResult);
        this.cubesDrawn = cubesDrawn;
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
    found: Token;
}

export type ParserResult<T> = Result<T, ParserError>;

export class Parser {
    #tokens: Token[];
    #position: number;

    constructor(tokens: Token[]) {
        this.#tokens = tokens;
        this.#position = 0;
    }

    parse(): ParserResult<GameLog> {
        return this.#gameLog();
    }

    #gameLog(): ParserResult<GameLog> {
        const results = this.#gameResults();
        if (results.isFailure()) {
            return results;
        }
        return ok(new GameLog(...results.value));
    }

    #gameResults(): ParserResult<GameResult[]> {
        const result = this.#gameResult();
        if (result.isFailure()) {
            return result;
        }
        return ok([result.value]);
    }

    #gameResult(): ParserResult<GameResult> {
        const results = this.#drawResults();
        if (results.isFailure()) {
            return results;
        }
        return ok(new GameResult(...results.value));
    }

    #drawResults(): ParserResult<DrawResult[]> {
        const result = this.#drawResult();
        if (result.isFailure()) {
            return result;
        }
        return ok([result.value]);
    }

    #drawResult(): ParserResult<DrawResult> {
        const results = this.#cubeResults();
        if (results.isFailure()) {
            return results;
        }
        return ok(new DrawResult(...results.value));
    }

    #cubeResults(): ParserResult<CubeResult[]> {
        const result = this.#cubeResult();
        if (result.isFailure()) {
            return result;
        }
        return ok([result.value]);
    }

    #cubeResult(): ParserResult<CubeResult> {
        const amountResult = this.#positiveNumber();
        if (amountResult.isFailure()) {
            return amountResult;
        }
        return ok(new CubeResult(amountResult.value));
    }

    #positiveNumber(): ParserResult<number> {
        const currentToken = this.#currentToken;
        if (currentToken.type !== TokenType.Number) {
            return this.#error('positive number', currentToken);
        }

        const number = Number(currentToken.value);

        return ok(number);
    }

    get #currentToken(): Token {
        return this.#tokens.at(this.#position)!;
    }

    // @ts-expect-error
    get #nextToken(): Token {
        if (this.#currentToken.type === TokenType.EOF) {
            return this.#tokens.at(-1)!;
        }
        return this.#tokens.at(this.#position + 1)!;
    }

    // @ts-expect-error
    #advance(): void {
        if (this.#currentToken.type === 'EOF') {
            return;
        }
        this.#position++;
    }

    #error(expected: string, found: Token): FailureResult<ParserError> {
        return failure({ expected, found });
    }
}
