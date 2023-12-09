import { readFileSync } from 'fs';
type Sample = number[];
type Samples = Sample[];

function __printArray(array: number[]) {
    console.log(array.map((x) => x.toString()).join(' '));
}

function readSamples(input: string): Samples {
    return input.split('\n').map((line) => line.split(' ').map((x) => Number(x)));
}

function extrapolateSample(sample: Sample) {
    // __printArray(sample);
    const diffs: Samples = [];
    let diff: Sample;
    do {
        const prev = diffs.at(-1) ?? sample;
        diff = new Array<number>(prev.length - 1);
        for (let i = 0; i < diff.length; i++) {
            diff[i] = prev[i + 1] - prev[i];
        }
        diffs.push(diff);
    } while (!diff.every((x) => x === 0));

    // diffs.forEach((diff) => {
    //     __printArray(diff);
    // });

    diffs.at(-1)?.unshift(0);
    for (let i = diffs.length - 2; i >= 0; i--) {
        diffs[i].unshift(diffs[i].at(0)! - diffs[i + 1].at(0)!);
    }

    // diffs.forEach((diff) => {
    //     __printArray(diff);
    // });

    sample.unshift(sample.at(0)! - diffs[0].at(0)!);
    // __printArray(sample);
}

const fileContent = readFileSync('../input.txt', { encoding: 'utf-8' });
const samples = readSamples(fileContent);
// console.log(samples);
samples.forEach((sample) => {
    extrapolateSample(sample);
});
const total = samples.map((s) => s.at(0)!).reduce((a, b) => a + b, 0);
console.log('Total is:', total);
// 1016 is correct answer
