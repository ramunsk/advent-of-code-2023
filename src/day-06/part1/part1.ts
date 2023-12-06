import { readFileSync } from 'fs';

interface Race {
    time: number;
    distance: number;
    waysToWin: number;
}

function readRaces(): Race[] {
    const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });
    const [timeStr, distanceStr] = fileContent.split('\n').map((s) => s.replace('Time:', '').replace('Distance:', ''));
    const times = timeStr
        .split(' ')
        .filter((x) => x.trim() !== '')
        .map((x) => Number(x));
    const distances = distanceStr
        .split(' ')
        .filter((x) => x.trim() !== '')
        .map((x) => Number(x));

    const races: Race[] = [];
    times.forEach((time, i) => races.push({ time, distance: distances[i], waysToWin: 0 }));
    return races;
}

const races = readRaces();
// console.log(races);

for (let race of races) {
    for (let i = 0; i < race.time; i++) {
        const speed = i;
        const timeLeft = race.time - i;
        const distance = speed * timeLeft;
        if (distance > race.distance) {
            race.waysToWin++;
        }
    }
}

const waysToWin = races.reduce((prev, curr) => prev * curr.waysToWin, 1);
console.log('Ways to win:', waysToWin);
