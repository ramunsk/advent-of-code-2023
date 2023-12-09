export interface Node {
    name: string;
    L: string;
    R: string;
    starting: boolean;
    ending: boolean;
}

export type Nodes = Record<string, Node>;

export type Direction = 'L' | 'R';

export class Map {
    readonly directions: Direction[];
    readonly nodes: Nodes;

    constructor(directions: Direction[], nodes: Nodes) {
        this.directions = directions;
        this.nodes = nodes;
    }

    walk() {
        let current: Node[] = Object.values(this.nodes).filter((n) => n.starting);
        let direction: Direction;
        let moves = 0;
        let position = 0;
        let atTheEnd = false;

        // Did not solve myself :(
        // Looked for the answers in redit
        // Apparently this is an LCM problem
        /*
            what people do is:
            - calculate at what intervals starting node hist ending node
            - calculate LCM from intervals
            This is relevant only when data is presented like that
            and it looks like in this AoC task it is
        */
        while (!atTheEnd) {
            direction = this.directions[position];
            current = current.map((c) => this.nodes[c[direction]]);
            position++;
            if (position >= this.directions.length) {
                position = 0;
            }
            moves++;

            atTheEnd = current.every((n) => n.ending);
        }

        return moves;
    }
}

export function createMap(text: string): Map {
    const [directionsLine, nodePart] = text.split('\n\n');

    const directions: Direction[] = directionsLine.split('') as Direction[];

    const nodes: Nodes = {};

    const nodeLines = nodePart.split('\n');
    for (let i = 0; i < nodeLines.length; i++) {
        const [[name], [left], [right]] = [...nodeLines[i].matchAll(/\w{3}/g)];
        nodes[name] = { name, L: left, R: right, starting: name.endsWith('A'), ending: name.endsWith('Z') };
    }

    const map = new Map(directions, nodes);
    return map;
}
// Not solved yet :(
