import { assert } from '../../common';

export class Range {
    readonly start: number;
    private _end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this._end = end;
    }

    get end(): number {
        return this._end;
    }

    toString(): string {
        return `${this.start}-${this.end}`;
    }

    isBorderingWith(other: Range): boolean {
        const bordering = this.start - 1 === other.end || this.end + 1 === other.start;
        const overlapping = this.start <= other.end && this.end >= other.start;

        return bordering || overlapping;
    }

    protected extend(byLength = 1): void {
        assert(byLength >= 0, 'Cannot extend range: invalid value provided');
        this._end += byLength;
    }
}
