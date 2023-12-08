export type CardRank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
    rank: CardRank;
    value: number;
}

export const Cards: Record<CardRank, Card> = {
    A: { rank: 'A', value: 14 },
    K: { rank: 'K', value: 13 },
    Q: { rank: 'Q', value: 12 },
    T: { rank: 'T', value: 10 },
    '9': { rank: '9', value: 9 },
    '8': { rank: '8', value: 8 },
    '7': { rank: '7', value: 7 },
    '6': { rank: '6', value: 6 },
    '5': { rank: '5', value: 5 },
    '4': { rank: '4', value: 4 },
    '3': { rank: '3', value: 3 },
    '2': { rank: '2', value: 2 },
    J: { rank: 'J', value: 1 },
};

export class HandType {
    readonly name: string;
    readonly value: number;

    private constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }

    static from(cards: Card[]): HandType {
        const ranksInHand = new Map<Card, number>();
        cards.forEach((c) => {
            if (ranksInHand.has(c)) {
                ranksInHand.set(c, ranksInHand.get(c)! + 1);
            } else {
                ranksInHand.set(c, 1);
            }
        });

        const jCard = Cards.J;
        if (ranksInHand.has(jCard)) {
            const jValue = ranksInHand.get(jCard)!;
            ranksInHand.delete(jCard);

            if (jValue === 5) {
                return new HandType('Five of a kind', 7);
            }

            const entries = [...ranksInHand.entries()].sort(([card1, count1], [card2, count2]) => {
                // if (card1 !== card2) {
                //     return card1.value - card2.value;
                // }

                // return count1 - count2;

                if (count1 != count2) {
                    return count1 - count2;
                }
                return card1.value - card2.value;
            });
            const card = entries.at(-1)![0];
            ranksInHand.set(card, ranksInHand.get(card)! + jValue);
        }

        const rankId = [...ranksInHand.values()]
            .map((x) => x.toString())
            .sort()
            .join('');

        switch (rankId) {
            case '5':
                return new HandType('Five of a kind', 7);
            case '14':
                return new HandType('Four of a kind', 6);
            case '23':
                return new HandType('Full house', 5);
            case '113':
                return new HandType('Three of a kind', 4);
            case '122':
                return new HandType('Two pair', 3);
            case '1112':
                return new HandType('One pair', 2);
            case '11111':
                return new HandType('High card', 1);
            default:
                throw new Error(`Could not create HandType from rankId ${rankId}`);
        }
    }
}

export class Hand {
    readonly cards: Card[];
    readonly type: HandType;
    readonly value: string;

    constructor(cards: Card[]) {
        this.cards = cards;
        this.type = HandType.from(cards);
        this.value = [this.type.value, ...this.cards.map((c) => c.value)]
            .map((x) => x.toString().padStart(2, '0'))
            .join('');
    }

    toString(): string {
        return `${this.cards.map((c) => c.rank).join('')} (${this.type.name}) [${this.value}]`;
    }
}

export class Game {
    readonly bid: number;
    readonly hand: Hand;

    constructor(bid: number, ...cards: Card[]) {
        this.bid = bid;
        this.hand = new Hand(cards);
    }

    toString(): string {
        return `${this.hand.toString()} -> ${this.bid}`;
    }
}

export function parseGames(text: string): Game[] {
    const lines = text.split('\n');
    const games = new Array<Game>(lines.length);

    for (let i = 0; i < lines.length; i++) {
        const game = parseGame(lines[i]);
        games[i] = game;
    }

    return games;
}

export function parseGame(line: string): Game {
    const [cardPart, bidPart] = line.split(' ');

    const cardStrings = cardPart.split('');
    const cards: Card[] = cardStrings.map((c) => Cards[c as CardRank]);

    const bid = Number(bidPart);
    const hand = new Game(bid, ...cards);

    return hand;
}
