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

    constructor(source: string) {
        this.#source = source ?? '';
        this.#sourceLength = this.#source.length;
        this.#tokens = new Array<Token>(this.#sourceLength);
        this.#numberOfTokens = 0;
        this.#line = 0;
        this.#column = 0;
    }

    tokenize(): Token[] {
        for (let i = 0; i < this.#sourceLength; i++) {
            const char = this.#source[i];
            const lastToken = this.#lastToken;

            switch (char) {
                case ' ':
                    this.#column++;
                    // ignore whitespace
                    break;
                case ':':
                    this.#addToken(TokenType.Colon, char);
                    this.#column++;
                    break;
                case ';':
                    this.#addToken(TokenType.Semicolon, char);
                    this.#column++;
                    break;
                case ',':
                    this.#addToken(TokenType.Comma, char);
                    this.#column++;
                    break;
                case '\n':
                    this.#addToken(TokenType.NewLine, char);
                    this.#column = 0;
                    this.#line++;
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
                    if (lastToken?.type === TokenType.Number) {
                        lastToken.value += char;
                    } else {
                        this.#addToken(TokenType.Number, char);
                    }
                    this.#column++;
                    break;
                default:
                    if (lastToken?.type === TokenType.Text) {
                        lastToken.value += char;
                    } else {
                        this.#addToken(TokenType.Text, char);
                    }
                    break;
            }
        }

        this.#addToken(TokenType.EOF, '');
        return this.#tokens.slice(0, this.#numberOfTokens);
    }

    #addToken(type: TokenType, value: string): void {
        this.#tokens[this.#numberOfTokens] = {
            type,
            value,
            line: this.#line,
            column: this.#column,
        };
        this.#numberOfTokens++;
    }

    get #lastToken(): Token | undefined {
        return this.#tokens.at(this.#numberOfTokens - 1);
    }
}
