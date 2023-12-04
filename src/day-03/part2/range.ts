export class Range {
    readonly start: number;
    readonly end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    toString(): string {
        return `${this.start}-${this.end}`;
    }

    isBorderingWith(other: Range): boolean {
        const bordering = this.start - 1 === other.end || this.end + 1 === other.start;
        const overlapping = this.start <= other.end && this.end >= other.start;

        return bordering || overlapping;
    }
}
