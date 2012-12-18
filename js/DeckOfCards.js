goog.provide('blackjack.DeckOfCards');

blackjack.DeckOfCards = function(){

    this.TWO = '2';
    this.THREE = '3';
    this.FOUR = '4';
    this.FIVE = '5';
    this.SIX = '6';
    this.SEVEN = '7';
    this.EIGHT = '8';
    this.NINE = '9';
    this.TEN = '10';
    this.JACK = 'J';
    this.QUEEN = 'Q';
    this.KING = 'K';
    this.ACE = 'A';

    this.cards = [
        {
            card: this.TWO,
            suite: blackjack.DIAMOND,
            value: 2
        },
        {
            card: this.THREE,
            suite: blackjack.DIAMOND,
            value: 3
        },
        {
            card: this.FOUR,
            suite: blackjack.DIAMOND,
            value: 4
        },
        {
            card: this.FIVE,
            suite: blackjack.DIAMOND,
            value: 5
        },
        {
            card: this.SIX,
            suite: blackjack.DIAMOND,
            value: 6
        },
        {
            card: this.SEVEN,
            suite: blackjack.DIAMOND,
            value: 7
        },
        {
            card: this.EIGHT,
            suite: blackjack.DIAMOND,
            value: 8
        },
        {
            card: this.NINE,
            suite: blackjack.DIAMOND,
            value: 9
        },
        {
            card: this.TEN,
            suite: blackjack.DIAMOND,
            value: 10
        },
        {
            card: this.JACK,
            suite: blackjack.DIAMOND,
            value: 10
        },
        {
            card: this.QUEEN,
            suite: blackjack.DIAMOND,
            value: 10
        },
        {
            card: this.KING,
            suite: blackjack.DIAMOND,
            value: 10
        },
        {
            card: this.ACE,
            suite: blackjack.DIAMOND,
            value: [1,11]
        },
        {
            card: this.TWO,
            suite: blackjack.SPADES,
            value: 2
        },
        {
            card: this.THREE,
            suite: blackjack.SPADES,
            value: 3
        },
        {
            card: this.FOUR,
            suite: blackjack.SPADES,
            value: 4
        },
        {
            card: this.FIVE,
            suite: blackjack.SPADES,
            value: 5
        },
        {
            card: this.SIX,
            suite: blackjack.SPADES,
            value: 6
        },
        {
            card: this.SEVEN,
            suite: blackjack.SPADES,
            value: 7
        },
        {
            card: this.EIGHT,
            suite: blackjack.SPADES,
            value: 8
        },
        {
            card: this.NINE,
            suite: blackjack.SPADES,
            value: 9
        },
        {
            card: this.TEN,
            suite: blackjack.SPADES,
            value: 10
        },
        {
            card: this.JACK,
            suite: blackjack.SPADES,
            value: 10
        },
        {
            card: this.QUEEN,
            suite: blackjack.SPADES,
            value: 10
        },
        {
            card: this.KING,
            suite: blackjack.SPADES,
            value: 10
        },
        {
            card: this.ACE,
            suite: blackjack.SPADES,
            value: [1,11]
        },
        {
            card: this.TWO,
            suite: blackjack.HEARTS,
            value: 2
        },
        {
            card: this.THREE,
            suite: blackjack.HEARTS,
            value: 3
        },
        {
            card: this.FOUR,
            suite: blackjack.HEARTS,
            value: 4
        },
        {
            card: this.FIVE,
            suite: blackjack.HEARTS,
            value: 5
        },
        {
            card: this.SIX,
            suite: blackjack.HEARTS,
            value: 6
        },
        {
            card: this.SEVEN,
            suite: blackjack.HEARTS,
            value: 7
        },
        {
            card: this.EIGHT,
            suite: blackjack.HEARTS,
            value: 8
        },
        {
            card: this.NINE,
            suite: blackjack.HEARTS,
            value: 9
        },
        {
            card: this.TEN,
            suite: blackjack.HEARTS,
            value: 10
        },
        {
            card: this.JACK,
            suite: blackjack.HEARTS,
            value: 10
        },
        {
            card: this.QUEEN,
            suite: blackjack.HEARTS,
            value: 10
        },
        {
            card: this.KING,
            suite: blackjack.HEARTS,
            value: 10
        },
        {
            card: this.ACE,
            suite: blackjack.HEARTS,
            value: [1,11]
        },
        {
            card: this.TWO,
            suite: blackjack.CLUBS,
            value: 2
        },
        {
            card: this.THREE,
            suite: blackjack.CLUBS,
            value: 3
        },
        {
            card: this.FOUR,
            suite: blackjack.CLUBS,
            value: 4
        },
        {
            card: this.FIVE,
            suite: blackjack.CLUBS,
            value: 5
        },
        {
            card: this.SIX,
            suite: blackjack.CLUBS,
            value: 6
        },
        {
            card: this.SEVEN,
            suite: blackjack.CLUBS,
            value: 7
        },
        {
            card: this.EIGHT,
            suite: blackjack.CLUBS,
            value: 8
        },
        {
            card: this.NINE,
            suite: blackjack.CLUBS,
            value: 9
        },
        {
            card: this.TEN,
            suite: blackjack.CLUBS,
            value: 10
        },
        {
            card: this.JACK,
            suite: blackjack.CLUBS,
            value: 10
        },
        {
            card: this.QUEEN,
            suite: blackjack.CLUBS,
            value: 10
        },
        {
            card: this.KING,
            suite: blackjack.CLUBS,
            value: 10
        },
        {
            card: this.ACE,
            suite: blackjack.CLUBS,
            value: [1,11]
        }
    ]

    return this.cards;
}
