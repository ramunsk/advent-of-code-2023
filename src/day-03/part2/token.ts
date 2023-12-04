import { assert } from '../../common';
import { Range } from './range';

export type TokenType = 'whitespace' | 'number' | 'gear';

export class Token extends Range {
    readonly type: TokenType;
    private _value: string;

    constructor(type: TokenType, value: string, start: number) {
        assert(start >= 0, 'Invalid token start position');
        assert(value.trim() !== '', 'Invalid initial token value');
        super(start, start + value.length - 1);
        this.type = type;
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    appendValue(value: string): void {
        this._value += value;
        super.extend(value.length);
    }
}
