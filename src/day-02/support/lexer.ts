export const enum TokenType {
    Text = 'Text',
    Number = 'Number',
    Colon = 'Colon',
    Semicolon = 'Semicolon',
    Comma = 'Comma',
    NewLine = 'NewLine',
    EOF = 'EOF',
}

export interface Token {
    type: TokenType;
    value: string;
    line: number;
    column: number;
}

export class Lexer {
    #source: string;
    #sourceLength: number;
    #tokens: Token[];
    #numberOfTokens: number;
    #line: number;
    #column: number;
    #canMerge: boolean;

    constructor(source: string) {
        this.#source = source ?? '';
        this.#sourceLength = this.#source.length;
        this.#tokens = new Array<Token>(this.#sourceLength);
        this.#numberOfTokens = 0;
        this.#line = 0;
        this.#column = 0;
        this.#canMerge = false;
    }

    tokenize(): Token[] {
        for (let position = 0; position < this.#sourceLength; position++) {
            const char = this.#source[position];

            switch (char) {
                case ' ':
                    // ignore whitespace
                    this.#column++;
                    this.#canMerge = false;
                    break;
                case ':':
                    this.#addToken(TokenType.Colon, char);
                    this.#column++;
                    this.#canMerge = false;
                    break;
                case ';':
                    this.#addToken(TokenType.Semicolon, char);
                    this.#column++;
                    this.#canMerge = false;
                    break;
                case ',':
                    this.#addToken(TokenType.Comma, char);
                    this.#column++;
                    this.#canMerge = false;
                    break;
                case '\n':
                    this.#addToken(TokenType.NewLine, char);
                    this.#column = 0;
                    this.#line++;
                    this.#canMerge = false;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    if (this.#lastToken?.type === TokenType.Number && this.#canMerge) {
                        this.#lastToken.value += char;
                    } else {
                        this.#addToken(TokenType.Number, char);
                    }
                    this.#column++;
                    this.#canMerge = true;
                    break;
                default:
                    // Text
                    if (this.#lastToken?.type === TokenType.Text && this.#canMerge) {
                        this.#lastToken.value += char;
                    } else {
                        this.#addToken(TokenType.Text, char);
                    }
                    this.#canMerge = true;
                    this.#column++;
                    break;
            }
        }

        this.#addToken(TokenType.EOF, '');
        return this.#tokens.slice(0, this.#numberOfTokens);
    }

    #addToken(type: TokenType, value: string, line?: number, column?: number): void {
        this.#tokens[this.#numberOfTokens] = {
            type,
            value,
            line: line ?? this.#line,
            column: column ?? this.#column,
        };
        this.#numberOfTokens++;
    }

    get #lastToken(): Token | undefined {
        return this.#tokens.at(this.#numberOfTokens - 1);
    }
}
