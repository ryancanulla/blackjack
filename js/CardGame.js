goog.provide('blackjack.CardGame');

goog.require('blackjack.DeckOfCards');
goog.require('blackjack.utils.ViewportMonitor');

blackjack.CardGame = function(){
    blackjack.utils.ViewportMonitor.call(this);
    this.deckOfCards = new blackjack.DeckOfCards();

    // stack the deck
    this.stackedDeck = [
        {
            card: blackjack.ACE,
            suite: blackjack.DIAMOND,
            value: [1,11]
        },
        {
            card: blackjack.JACK,
            suite: blackjack.CLUBS,
            value: 10
        },
        {
            card: blackjack.TWO,
            suite: blackjack.DIAMOND,
            value: [5]
        },
        {
            card: blackjack.JACK,
            suite: blackjack.DIAMOND,
            value: 10
        }
    ];
};
goog.inherits(blackjack.CardGame, blackjack.utils.ViewportMonitor);

blackjack.CardGame.prototype.getCard = function(){
    var index,
        card;

    index = this.getNewCardIndex();
    card = this.pullCardFromDeck(index);
    card = card[0];

    return card;
};

blackjack.CardGame.prototype.getNewCardIndex = function(){
    var index,
        length = this.deckOfCards.length - 1;

    index = Math.random() * length;
    index = Math.round(index);

    return index;
};

blackjack.CardGame.prototype.pullCardFromDeck = function(index){
//    return this.stackedDeck.splice(0,1);
    return this.deckOfCards.splice(index, 1);
};

blackjack.CardGame.prototype.shuffelDeck = function(){
    this.deckOfCards = new blackjack.DeckOfCards();
};

blackjack.CardGame.prototype.reset = function(){
    this.shuffelDeck();
};