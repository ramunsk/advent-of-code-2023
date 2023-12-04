import { Token, TokenType } from './lexer';
import { FailureResult, Result, failure, ok } from './result';

export interface AstNodeVisitor<T> {
    visitGameLog(gameLog: GameLog): T;
    visitGameRecord(gameRecord: GameRecord): T;
    visitDrawResult(drawResult: DrawResult): T;
    visitCubeResult(cubeResult: CubeResult): T;
}

export const enum AstNodeKind {
    GameLog = 'GameLog',
    GameRecord = 'GameRecord',
    DrawResult = 'DrawResult',
    CubeResult = 'CubeResult',
}

const CubeColors = ['red', 'green', 'blue'] as const;
export type CubeColor = (typeof CubeColors)[number];

abstract class AstNode {
    readonly kind: AstNodeKind;

    constructor(kind: AstNodeKind) {
        this.kind = kind;
    }

    abstract accept<T>(visitor: AstNodeVisitor<T>): T;
}

export class GameLog extends AstNode {
    readonly games: GameRecord[];

    constructor(...games: GameRecord[]) {
        super(AstNodeKind.GameLog);
        this.games = games ?? [];
    }

    accept<T>(visitor: AstNodeVisitor<T>): T {
        return visitor.visitGameLog(this);
    }
}

export class GameRecord extends AstNode {
    readonly draws: DrawResult[];

    constructor(...draws: DrawResult[]) {
        super(AstNodeKind.GameRecord);
        this.draws = draws;
    }

    accept<T>(visitor: AstNodeVisitor<T>): T {
        return visitor.visitGameRecord(this);
    }
}

export class DrawResult extends AstNode {
    readonly cubesDrawn: CubeResult[];

    constructor(...cubesDrawn: CubeResult[]) {
        super(AstNodeKind.DrawResult);
        this.cubesDrawn = cubesDrawn;
    }

    accept<T>(visitor: AstNodeVisitor<T>): T {
        return visitor.visitDrawResult(this);
    }
}

export class CubeResult extends AstNode {
    readonly amount: number;
    readonly color: CubeColor;

    constructor(amount: number, color: CubeColor) {
        super(AstNodeKind.CubeResult);
        this.amount = amount;
        this.color = color;
    }

    accept<T>(visitor: AstNodeVisitor<T>): T {
        return visitor.visitCubeResult(this);
    }
}

export interface ParserError {
    expected: string;
    found: Token;
}

export type ParserResult<T> = Result<T, ParserError>;

export class Parser {
    private tokens: Token[];
    private position: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse(): ParserResult<GameLog> {
        return this.gameLog();
    }

    private gameLog(): ParserResult<GameLog> {
        const results = this.gameRecords();
        if (results.isFailure()) {
            return results;
        }
        return ok(new GameLog(...results.value));
    }

    private gameRecords(): ParserResult<GameRecord[]> {
        const records: GameRecord[] = [];
        while (this.currentToken.type !== TokenType.EOF) {
            const record = this.gameRecord();
            if (record.isFailure()) {
                return record;
            }
            records.push(record.value);

            const currentTokenType = this.currentToken.type;
            // TS complains about this.#currentToken.type !== TokenType.EOF
            // such check already exists in `while` condition and TS thinks this should
            // never be a case. But in our case parsing functions can advance reading position
            // and `currentToken` can have different value after calling them
            // @ts-expect-error
            if (currentTokenType !== TokenType.NewLine && currentTokenType !== TokenType.EOF) {
                return this.error('end of line', this.currentToken);
            }
            this.advance();
        }
        return ok(records);
    }

    private gameRecord(): ParserResult<GameRecord> {
        let currentToken = this.currentToken;
        if (currentToken.type !== TokenType.Text || currentToken.value !== 'Game') {
            return this.error('"Game"', currentToken);
        }
        this.advance();

        const gameId = this.positiveNumber();
        if (gameId.isFailure()) {
            return gameId;
        }

        currentToken = this.currentToken;
        if (currentToken.type !== TokenType.Colon) {
            return this.error('":"', currentToken);
        }
        this.advance();

        const results = this.drawResults();
        if (results.isFailure()) {
            return results;
        }
        return ok(new GameRecord(...results.value));
    }

    private drawResults(): ParserResult<DrawResult[]> {
        const results: DrawResult[] = [];

        let currentTokenType: TokenType;
        do {
            const drawResult = this.drawResult();
            if (drawResult.isFailure()) {
                return drawResult;
            }
            results.push(drawResult.value);
            if (this.currentToken.type === TokenType.Semicolon) {
                this.advance();
            }
            currentTokenType = this.currentToken.type;
        } while (
            currentTokenType !== TokenType.Semicolon &&
            currentTokenType !== TokenType.NewLine &&
            currentTokenType !== TokenType.EOF
        );

        return ok(results);
    }

    private drawResult(): ParserResult<DrawResult> {
        const cubeResults = this.cubeResults();
        if (cubeResults.isFailure()) {
            return cubeResults;
        }
        return ok(new DrawResult(...cubeResults.value));
    }

    private cubeResults(): ParserResult<CubeResult[]> {
        const results: CubeResult[] = [];
        do {
            const result = this.cubeResult();
            if (result.isFailure()) {
                return result;
            }
            results.push(result.value);
            if (this.currentToken.type === TokenType.Comma) {
                this.advance();
            }
        } while (
            this.currentToken.type !== TokenType.Semicolon &&
            this.currentToken.type !== TokenType.NewLine &&
            this.currentToken.type !== TokenType.EOF
        );

        return ok(results);
    }

    private cubeResult(): ParserResult<CubeResult> {
        const amountResult = this.positiveNumber();
        if (amountResult.isFailure()) {
            return amountResult;
        }

        const colorToken = this.currentToken;
        const color = colorToken.value as CubeColor;
        if (colorToken.type !== TokenType.Text && !CubeColors.includes(color)) {
            return this.error(CubeColors.map((cc) => `"${cc}"`).join(', '), this.currentToken);
        }
        this.advance();
        return ok(new CubeResult(amountResult.value, color));
    }

    private positiveNumber(): ParserResult<number> {
        const currentToken = this.currentToken;
        if (currentToken.type !== TokenType.Number) {
            return this.error('positive number', currentToken);
        }

        const number = Number(currentToken.value);
        this.advance();
        return ok(number);
    }

    private get currentToken(): Token {
        return this.tokens.at(this.position)!;
    }

    private advance(): void {
        if (this.currentToken.type === 'EOF') {
            return;
        }
        this.position++;
    }

    private error(expected: string, found: Token): FailureResult<ParserError> {
        return failure({ expected, found });
    }
}
