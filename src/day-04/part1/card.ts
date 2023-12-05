export class Card {
    readonly id: number;
    readonly winningNumbers: number[];
    readonly numbers: number[];
    readonly source: string;

    constructor(id: number, winningNumbers: number[], numbers: number[], source: string) {
        this.id = id;
        this.winningNumbers = winningNumbers;
        this.numbers = numbers;
        this.source = source;
    }

    get value(): number {
        const luckyNumbers = this.numbers.filter((n) => this.winningNumbers.includes(n)).length;
        if (luckyNumbers === 0) {
            return 0;
        }
        return 1 << (luckyNumbers - 1);
    }
}
