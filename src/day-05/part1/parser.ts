import { AlmanacMap } from './almanac-map';
import { CombinedRange } from './combined-range';
import { SeedArray } from './seed-array';

export class Parser {
    parse(text: string): [SeedArray, AlmanacMap[]] {
        const [seedGroup, ...mapGroups] = text.split('\n\n');
        const seeds = this.parseSeeds(seedGroup);
        const maps: AlmanacMap[] = [];

        for (let mapGroup of mapGroups) {
            maps.push(this.parseMap(mapGroup));
        }

        return [seeds, maps];
    }

    private parseSeeds(line: string): SeedArray {
        const seeds = [...line.matchAll(/\d+/g)].map((x) => Number(x));
        return seeds;
    }

    private parseMap(lineGroup: string): AlmanacMap {
        const [header, ...rangeSpecs] = lineGroup.split('\n');
        const { source, destination } = /^(?<source>\w+)-to-(?<destination>\w+)/g.exec(header)!.groups!;
        // console.log(lines[0]);
        // console.log(source, destination);
        const ranges: CombinedRange[] = [];
        for (let rangeSpec of rangeSpecs) {
            const [destStart, sourceStart, length] = rangeSpec.split(' ').map((x) => Number(x.trim()));
            ranges.push(new CombinedRange(sourceStart, destStart, length));
        }

        return new AlmanacMap(lineGroup, source, destination, ranges);
    }
}
