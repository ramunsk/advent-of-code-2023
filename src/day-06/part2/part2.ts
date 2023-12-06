import { readFileSync } from 'fs';

interface Race {
    time: number;
    distance: number;
    waysToWin: number;
}

function readRace(): Race {
    const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });
    const [timeStr, distanceStr] = fileContent.split('\n').map((s) => s.replace('Time:', '').replace('Distance:', ''));
    const time = Number(timeStr.replaceAll(' ', ''));
    const distance = Number(distanceStr.replaceAll(' ', ''));

    return { time, distance, waysToWin: 0 };
}

const race = readRace();
// console.log(race);

for (let i = 0; i < race.time; i++) {
    const speed = i;
    const timeLeft = race.time - i;
    const distance = speed * timeLeft;
    if (distance > race.distance) {
        race.waysToWin++;
    }
}

console.log('Ways to win:', race.waysToWin);
// 30077773 is the right answer
