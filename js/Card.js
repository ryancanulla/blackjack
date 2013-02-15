goog.provide('blackjack.Card');

blackjack.Card = function(cardDetails){
    lime.Sprite.call(this);

    this.cardDetails = cardDetails;
    this.setSize(135,172);

    this.suite = this.cardDetails.suite;
    this.number = this.cardDetails.card;
    this.isFaceUp = this.cardDetails.isFaceUp;

    this.BLACK = '#000000';
    this.RED = '#d80000';

    this.createChildren();
};
goog.inherits(blackjack.Card, lime.Sprite);

blackjack.Card.prototype.createChildren = function(){
    var background = new lime.Sprite(),
        suite = new lime.Sprite(),
        number = new lime.Label();

    background.setFill(this.getBackground());
    background.setAnchorPoint(0,0);
    background.setPosition(0,0);

    suite.setFill(this.getSuite());
    suite.setPosition(66, 115);

    number.setAnchorPoint(.5,.5);
    number.setFontColor(this.getColor());
    number.setFontFamily('Rock');
    number.setFontWeight('bold');

    if(goog.userAgent.IE) {
        number.setFontFamily('Arial');
    }

    if(this.cardDetails.card === blackjack.JACK) {
        number.setFontSize(70);
        number.setPosition(66, 50);

        if(goog.userAgent.IE) {
            number.setPosition(66, 45);
        }
    }
    else {
        number.setFontSize(80);
        number.setPosition(66, 57);

        if(goog.userAgent.IE) {
            number.setPosition(66, 50);
        }
    }

    number.setText(this.number);

    if(this.isFaceUp === false) {
        suite.setHidden(true);
        number.setHidden(true);
    }

    this.appendChild(background);
    this.appendChild(suite);
    this.appendChild(number);

    this.backgroundDisplay = background;
    this.suiteDisplay = suite;
    this.numberDisplay = number;
};


blackjack.Card.prototype.getColor = function(){
    switch (this.suite){
        case blackjack.SPADES:
            return this.BLACK;
            break;
        case blackjack.DIAMOND:
            return this.RED;
            break;
        case blackjack.HEARTS:
            return this.RED;
            break;
        case blackjack.CLUBS:
            return this.BLACK;
            break;
    }
};

blackjack.Card.prototype.getBackground = function(){
    switch (this.isFaceUp){
        case true:
            return 'assets/card/faceUpBackground.png'
            break;
        case false:
            return 'assets/card/faceDownBackground.png'
            break;
    }
};

blackjack.Card.prototype.getSuite = function(){
    switch (this.suite){
        case blackjack.SPADES:
            return 'assets/card/spades.png'
            break;
        case blackjack.DIAMOND:
            return 'assets/card/diamonds.png'
            break;
        case blackjack.HEARTS:
            return 'assets/card/hearts.png'
            break;
        case blackjack.CLUBS:
            return 'assets/card/clubs.png'
            break;
    }
};

blackjack.Card.prototype.turnOverCard = function(){
    this.isFaceUp = true;
    this.backgroundDisplay.setFill(this.getBackground());
    this.suiteDisplay.setHidden(false);
    this.numberDisplay.setHidden(false);
};




goog.inherits(blackjack.Menu, blackjack.utils.ViewportMonitor);
