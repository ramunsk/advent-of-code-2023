import { CombinedRange } from './combined-range';

export class AlmanacMap {
    readonly srcText: string;
    readonly source: string;
    readonly destination: string;
    readonly ranges: CombinedRange[];

    constructor(srcText: string, source: string, destination: string, ranges: CombinedRange[]) {
        this.srcText = srcText;
        this.source = source;
        this.destination = destination;
        this.ranges = ranges;
    }

    getDestination(source: number): number {
        let result: number | undefined;
        for (let range of this.ranges) {
            result = range.getDestination(source);
            if (result !== undefined) {
                break;
            }
        }

        return result ?? source;
    }
}
