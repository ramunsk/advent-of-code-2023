import { Range } from './range';

export type TokenType = 'whitespace' | 'number' | 'gear' | 'symbol';

export class Token extends Range {
    readonly type: TokenType;
    readonly value: string;

    constructor(type: TokenType, value: string, start: number) {
        super(start, start + value.length - 1);
        this.type = type;
        this.value = value;
    }
}
