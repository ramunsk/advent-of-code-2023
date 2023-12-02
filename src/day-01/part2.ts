import { readFileSync } from 'fs';

interface Tag {
    value: string;
    num: number;
}

const tags: Tag[] = [
    { value: '1', num: 1 },
    { value: '2', num: 2 },
    { value: '3', num: 3 },
    { value: '4', num: 4 },
    { value: '5', num: 5 },
    { value: '6', num: 6 },
    { value: '7', num: 7 },
    { value: '8', num: 8 },
    { value: '9', num: 9 },
    { value: 'one', num: 1 },
    { value: 'two', num: 2 },
    { value: 'three', num: 3 },
    { value: 'four', num: 4 },
    { value: 'five', num: 5 },
    { value: 'six', num: 6 },
    { value: 'seven', num: 7 },
    { value: 'eight', num: 8 },
    { value: 'nine', num: 9 },
];


let sum = 0;
const text = readFileSync('./input.txt', 'utf8');
const lines = text.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let min: number | undefined;
    let max: number | undefined;
    let startTag: Tag;
    let endTag: Tag

    tags.forEach(tag => {
        let index = 0;
        do {
            index = line.indexOf(tag.value, index);
            if (index === -1) {
                return;
            }
            if (min === undefined || index < min) {
                min = index;
                startTag = tag;
            }
            if (max === undefined || index > max) {
                max = index
                endTag = tag;
            }
            index++;
            // console.log(index);
        } while (index !== -1)
    })


    // console.log([[min, startTag.value], [max, endTag?.value]]);
    // console.log(line);
    const num = startTag.num * 10 + (endTag?.num ?? startTag.num);
    console.log(num);

    sum += num;
    min = undefined;
    max = undefined;
}
console.log('sum is:', sum);
