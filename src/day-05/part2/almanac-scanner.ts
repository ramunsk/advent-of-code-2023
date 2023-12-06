import { AlmanacMap } from './almanac-map';
import { SeedArray } from './seed-array';

export class AlmanacScanner {
    private readonly seeds: SeedArray;
    private readonly maps: AlmanacMap[];

    constructor(seeds: SeedArray, maps: AlmanacMap[]) {
        this.seeds = seeds;
        this.maps = maps;
    }

    scan() {
        let min = Number.MAX_VALUE;
        const pairs: number[][] = [];
        for (let i = 0; i < this.seeds.length; i += 2) {
            pairs.push([this.seeds[i], this.seeds[i + 1]]);
        }
        console.log(pairs);

        for (let pair of pairs) {
            const [start, length] = pair;
            console.log(start);
            for (let i = start; i < start + length; i++) {
                let map = this.maps.find((m) => m.source === 'seed');
                let dest = i;

                do {
                    dest = map!.getDestination(dest);
                    map = this.maps.find((m) => m.source === map!.destination);
                } while (map !== undefined);

                if (dest < min) {
                    min = dest;
                }
            }
        }

        return min;
    }
}
