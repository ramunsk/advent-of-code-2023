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
        const locations: number[] = [];
        for (let seed of this.seeds) {
            let map = this.maps.find((m) => m.source === 'seed');
            let dest = seed;

            do {
                dest = map!.getDestination(dest);
                map = this.maps.find((m) => m.source === map!.destination);
            } while (map !== undefined);

            locations.push(dest);
        }

        return Math.min(...locations);
    }
}
