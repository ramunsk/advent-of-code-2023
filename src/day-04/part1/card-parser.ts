import { Card } from './card';

export class CardParser {
    parse(input: string): Card[] {
        const lines = input.split('\n');
        const cards: Card[] = new Array(lines.length);
        for (let i = 0; i < lines.length; i++) {
            const card = this.parseCard(lines[i]);
            cards[i] = card;
        }
        return cards;
    }

    private parseCard(line: string): Card {
        const [header, body] = line.split(':');
        const cardId = Number(header.replace('Card', ''));
        const [winningNumbersStr, cardNumbersStr] = body.split('|');
        const winningNumbers = [...winningNumbersStr.matchAll(/\d+/g)].map((x) => Number(x[0]));
        const cardNumbers = [...cardNumbersStr.matchAll(/\d+/g)].map((x) => Number(x[0]));
        const card = new Card(cardId, winningNumbers, cardNumbers, line);
        return card;
    }
}
