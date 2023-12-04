import chalk from 'chalk';

const specialSymbolRx = /[^\d\.]/m;

interface NumberToken {
    readonly value: number;
    readonly start: number;
    readonly end: number;
}

export function scanLine(line: string, previousLine: string | undefined, nextLine: string | undefined): number {
    let i = 0;
    let num = '';
    let numberTokens: NumberToken[] = [];

    while (i < line.length) {
        const char = line.charAt(i);
        if (char >= '0' && char <= '9') {
            num += char;
        } else {
            if (num !== '') {
                numberTokens.push({
                    value: Number(num),
                    start: i - num.length,
                    end: i - 1,
                });
                num = '';
            }
        }
        i++;
    }
    if (num !== '') {
        numberTokens.push({
            value: Number(num),
            start: i - num.length,
            end: i - 1,
        });
        num = '';
    }
    // console.log(numbers);

    let sum = 0;

    const validTokens: NumberToken[] = [];

    numberTokens.forEach((token) => {
        // console.log('Token #', i);
        // console.log('Token is:', token);
        // character before number
        let str = line.charAt(token.start - 1);
        console.log(`-- token: ${token.value} @${token.start}`);
        console.log(`-- char before: [${str}]`);
        if (specialSymbolRx.test(str)) {
            // console.log('including');
            sum += token.value;
            validTokens.push(token);
            return;
        }

        // characters above number (including diagonal)
        str = (previousLine ?? '').slice(token.start === 0 ? 0 : token.start - 1, token.end + 2);
        // console.log(`-- chars above: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            validTokens.push(token);
            return;
        }

        // character after number
        str = line.charAt(token.end + 1);
        // console.log(`-- char after: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            validTokens.push(token);
            return;
        }

        // characters below number (including diagonal)
        str = (nextLine ?? '').slice(token.start === 0 ? 0 : token.start - 1, token.end + 2);
        // console.log(`-- chars below: [${str}]`);
        if (specialSymbolRx.test(str)) {
            sum += token.value;
            validTokens.push(token);
            return;
        }
    });

    // construct coloured line;
    const firstToken = validTokens[0];
    let colouredLine = line.slice(0, firstToken.start);

    for (let t = 0; t < validTokens.length; t++) {
        colouredLine += chalk.blue(validTokens[t].value);
        const nextToken = validTokens[t + 1];
        colouredLine += line.slice(validTokens[t].end + 1, nextToken?.start ?? 500);
    }

    // console.log(line);
    console.log(colouredLine);

    return sum;
}
