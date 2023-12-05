export class Card {
    readonly id: number;
    readonly winningNumbers: number[];
    readonly numbers: number[];
    readonly source: string;
    readonly luckyNumberCount: number;

    constructor(id: number, winningNumbers: number[], numbers: number[], source: string) {
        this.id = id;
        this.winningNumbers = winningNumbers;
        this.numbers = numbers;
        this.source = source;
        this.luckyNumberCount = this.numbers.filter((n) => this.winningNumbers.includes(n)).length;
    }
}
