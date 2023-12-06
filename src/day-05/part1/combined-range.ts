export class CombinedRange {
    readonly sourceStart: number;
    readonly destinationStart: number;
    readonly length: number;

    constructor(sourceStart: number, destinationStart: number, length: number) {
        this.sourceStart = sourceStart;
        this.destinationStart = destinationStart;
        this.length = length;
    }

    getDestination(source: number): number | undefined {
        const inRange = source >= this.sourceStart && source <= this.sourceStart + this.length - 1;
        if (!inRange) {
            return undefined;
        }

        const offset = source - this.sourceStart;
        return this.destinationStart + offset;
    }
}
