export interface Node {
    name: string;
    L: string;
    R: string;
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
        let current: Node = this.nodes['AAA'];
        let direction: Direction;
        let position = 0;
        let moves = 0;

        while (current.name !== 'ZZZ') {
            direction = this.directions[position];
            current = this.nodes[current[direction]];
            position++;
            moves++;
            if (position >= this.directions.length) {
                position = 0;
            }
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
        const [[name], [left], [right]] = [...nodeLines[i].matchAll(/[A-Z]{3}/g)];
        nodes[name] = { name, L: left, R: right };
    }

    const map = new Map(directions, nodes);
    return map;
}

// 21251 is correct answer
