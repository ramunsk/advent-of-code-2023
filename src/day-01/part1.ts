import { readFileSync } from "fs";

const text = readFileSync("./input.txt", "utf8");
let sum = 0;
const lines = text.split("\n");

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let firstNum: string | undefined = undefined;
    let secondNum: string | undefined = undefined;

    for (const char of line.split("")) {
        if (char >= "0" && char <= "9") {
            if (firstNum === undefined) {
                firstNum = char;
            } else {
                secondNum = char;
            }
        }
    }

    const numStr = firstNum! + (secondNum ?? firstNum);
    const num = parseInt(numStr);
    console.log(num);
    sum += num;
    firstNum = undefined;
    secondNum = undefined;
}

console.log(sum);
