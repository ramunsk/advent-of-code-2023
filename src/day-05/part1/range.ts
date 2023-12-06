export class Range {
    readonly start: number;
    readonly end: number;

    constructor(start: number, length: number) {
        this.start = start;
        this.end = this.start + length - 1;
    }
}
