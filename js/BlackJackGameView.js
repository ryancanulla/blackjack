goog.provide('blackjack.BlackJackGameView');

goog.require('blackjack.Button');
goog.require('blackjack.Card');
goog.require('blackjack.BlackJackGame');
goog.require('blackjack.Inventory');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');

blackjack.BlackJackGameView = function (gender, isPreload) {
    if (!isPreload) {
        blackjack.BlackJackGame.call(this, gender);
    }
    this.cards = [];
    this.cardQueue = [];
    this.hasAnti = false;

    this.createChildren();
    this.start();

    lime.scheduleManager.scheduleWithDelay(function (dt) {
        this.tick();
    }, this, 500);
};
goog.inherits(blackjack.BlackJackGameView, blackjack.BlackJackGame);

blackjack.BlackJackGameView.prototype.start = function(){

    lime.scheduleManager.callAfter(function(dt){
        if(!this.hasAnti) {
            this.inventory.antiUp();
            this.hasAnti = true;
            blackjack.BlackJackGame.prototype.start.call(this);
        }
        else {
            blackjack.BlackJackGame.prototype.start.call(this);
        }
    }, this, 2000);

};

blackjack.BlackJackGameView.prototype.createChildren = function () {
    this.background = new lime.Sprite();
    this.background.setAnchorPoint(0, 0);
    this.background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    this.deck = new lime.Sprite()
    this.deck.setAnchorPoint(.5, .5);
    this.deck.setFill('assets/card/deck.png');

    this.hitButton = new blackjack.Button('assets/game/hitButton.png', 'assets/game/hitButtonDown.png');
    this.hitButton.setAnchorPoint(.5, .5);

    this.standButton = new blackjack.Button('assets/game/standButton.png', 'assets/game/standButtonDown.png');
    this.standButton.setAnchorPoint(.5, .5);

    this.computerLabel = new lime.Label();
    this.computerLabel.setAnchorPoint(0, .5);
    this.computerLabel.setFontSize(50);
    this.computerLabel.setFontColor('#ffffff');
    this.computerLabel.setFontFamily('Arial');
    this.computerLabel.setFontWeight('bold');
    this.computerLabel.setAlign('left');
    this.computerLabel.setSize(500, 40);
    this.computerLabel.setText(this.computer.name + ':');

    this.computerTotal = new lime.Label();
    this.computerTotal.setAnchorPoint(0, .5);
    this.computerTotal.setFontSize(100);
    this.computerTotal.setFontColor('#88d52f');
    this.computerTotal.setFontFamily('Gotham');


    if(goog.userAgent.IE) {
        this.computerTotal.setFontFamily('Arial');
        this.computerTotal.setFontSize(80);
        this.computerTotal.setFontWeight('bold');
    }

    this.computerTotal.setText('');

    this.youLabel = new lime.Label();
    this.youLabel.setFontSize(50);
    this.youLabel.setAnchorPoint(0, .5);
    this.youLabel.setFontColor('#ffffff');
    this.youLabel.setFontFamily('Arial');
    this.youLabel.setFontWeight('bold');
    this.youLabel.setText(this.player.name + ':');

    this.youTotal = new lime.Label();
    this.youTotal.setAnchorPoint(0, .5);
    this.youTotal.setFontSize(100);
    this.youTotal.setFontColor('#88d52f');
    this.youTotal.setFontFamily('Gotham');

    if(goog.userAgent.IE) {
        this.youTotal.setFontFamily('Arial');
        this.youTotal.setFontSize(80);
        this.youTotal.setFontWeight('bold');
    }

    this.youTotal.setText('');

    this.inventory = new blackjack.Inventory(this.player.inventoryItems);
    this.inventory.setAnchorPoint(1, .5);

    this.turnIndicator = new lime.Sprite();
    this.turnIndicator.setAnchorPoint(0,.5);
    this.turnIndicator.setFill('assets/game/sideArrow.png');
    this.turnIndicator.setOpacity(0);

    this.winIncicator = new lime.Label();
    this.winIncicator.setFontSize(65);
    this.winIncicator.setAnchorPoint(0, .5);
    this.winIncicator.setFontColor('#88d52f');
    this.winIncicator.setFontFamily('Gotham');

    if(goog.userAgent.IE) {
        this.winIncicator.setFontFamily('Arial');
        this.winIncicator.setFontWeight('bold');
    }

    this.winIncicator.setFontWeight('bold');
    this.winIncicator.setSize(500, 50);
    this.winIncicator.setText('');

    this.gameLogo = new lime.Sprite();
    this.gameLogo.setAnchorPoint(0,.5);
    this.gameLogo.setFill('assets/game/logo.png');

    // LAYOUT
    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        this.background.setFill('assets/game/backgroundLandscape.png');

        this.computerLabel.setPosition(315, 50);
        this.youLabel.setPosition(315, 530);

        if (this.computer.gender === blackjack.MAN) {
            this.computerTotal.setPosition(580, 60);
        }
        else if (this.computer.gender === blackjack.WOMAN) {
            this.computerTotal.setPosition(665, 60);
        }
        this.youTotal.setPosition(460, 530);

        this.hitButton.setPosition(350, blackjack.HEIGHT * .88);
        this.standButton.setPosition(700, blackjack.HEIGHT * .88);

        this.deck.setScale(.9);
        this.deck.setPosition(490,365);
        this.inventory.setPosition(1050, 845);
        this.winIncicator.setPosition(585,365);
        this.gameLogo.setPosition(920,375);

    }
    else {
        this.background.setFill('assets/game/background.png');
        this.computerLabel.setPosition(75, 70);

        if (this.computer.gender === blackjack.MAN) {
            this.computerTotal.setPosition(340, 80);
        }
        else if (this.computer.gender === blackjack.WOMAN) {
            this.computerTotal.setPosition(430, 80);
        }

        this.hitButton.setPosition(blackjack.WIDTH * .3, blackjack.HEIGHT * .93);
        this.standButton.setPosition(blackjack.WIDTH * .7, blackjack.HEIGHT * .93);

        this.youLabel.setPosition(75, 745);
        this.youTotal.setPosition(225, 745);

        this.deck.setPosition(215,490);
        this.inventory.setPosition(350, 1065);
        this.winIncicator.setPosition(275,470);
        this.gameLogo.setPosition(475,475);
    }


    goog.events.listen(this.hitButton, ['mousedown', 'touchstart'], function () {
        if (this.isPlayerTurn === false) {
            return;
        }
        this.animatePlayerControls();
        this.onHit();
        blackjack.playSound(blackjack.CLICK_SOUND);
    }, false, this);

    goog.events.listen(this.standButton, ['mousedown', 'touchstart'], function () {
        if (this.isPlayerTurn === false) {
            return;
        }

        this.animatePlayerControls();
        this.onStand();
        blackjack.playSound(blackjack.CLICK_SOUND);
    }, false, this);

    this.appendChild(this.background);
    this.appendChild(this.hitButton);
    this.appendChild(this.standButton);

    this.appendChild(this.youLabel);
    this.appendChild(this.youTotal);

    this.appendChild(this.computerLabel);
    this.appendChild(this.computerTotal);

    this.appendChild(this.inventory);
    this.appendChild(this.turnIndicator);
    this.appendChild(this.winIncicator);
    this.appendChild(this.gameLogo);
    this.appendChild(this.deck);
};


blackjack.BlackJackGameView.prototype.tick = function (dt) {
    var card = this.cardQueue.splice(0, 1);

    card = card[0];

    if (card && !this.handOver) {
        this.appendChild(card);
        this.cards.push(card);
        card.cardDetails.hasBeenDealt = true;

        if (card.cardDetails.owner === this.player) {
            this.player.cards.push(card);
            this.updateCardLayout(this.player);
            this.youTotal.setText(this.getTotalForLabel(this.player));

            if(this.player.cards.length === 2) {
                this.checkForBlackJack();
            }
        }
        else if (card.cardDetails.owner === this.computer) {
            this.computer.cards.push(card);
            this.updateCardLayout(this.computer);
            this.computerTotal.setText(this.getTotalForLabel(this.computer));

            if(this.computer.cards.length === 2) {
                this.checkForBlackJack();
            }
        }
        blackjack.playSound(blackjack.DEAL_CARD_SOUND);
    }
    this.animatePlayerControls();

};

blackjack.BlackJackGameView.prototype.animatePlayerControls = function() {
    var fade;

    if(this.isPlayerTurn && !this.isDealing && !this.handOver) {
        fade  = new lime.animation.FadeTo(1).setDuration(.5);
        this.hitButton.runAction(fade);
        this.standButton.runAction(fade);
    }
    else {
        fade  = new lime.animation.FadeTo(.25).setDuration(.5);
        this.hitButton.runAction(fade);
        this.standButton.runAction(fade);
    }
}

blackjack.BlackJackGameView.prototype.getTotalForLabel = function (person) {
    var total = this.getHandTotal(person);

    if(this.hasBlackJack(person)) {
        this.styleTotalLabelForBlackJack(person);
        return 'BLACKJACK'
    }

    if (total === 0) {
        return '';
    }
    return total;
};

blackjack.BlackJackGameView.prototype.styleTotalLabelForBlackJack = function (person) {
    if(person === this.player) {
        this.youTotal.setFontSize(70);
    }
    else if (person === this.computer) {
        this.showComputersCards();
        this.computerTotal.setFontSize(70);
    }
};

blackjack.BlackJackGameView.prototype.makeCard = function (cardDetails) {
    var card;

    card = new blackjack.Card(cardDetails);
    card.setAnchorPoint(.5,.5);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        card.setScale(.9);
    }
    card.setPosition(this.deck.getPosition());

    this.cardQueue.push(card);
};

blackjack.BlackJackGameView.prototype.updateCardLayout = function (person) {
    var cards = person.cards,
        i, length = cards.length,
        card,
        yPos,xPos,
        cardWidth,
        spaceBetweenCards,
        move,
        xVal;

    if(person === this.player) {
        if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
            yPos = 585;
        }
        else {
            yPos = 800;
        }
    }
    else {
        if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
            yPos = 105;
        }
        else {
            yPos = 125;
        }

    }

    for(i=0; i<length; i+=1) {
        card = cards[i];
        cardWidth = card.getSize().width;

        if(length > 6) {
            spaceBetweenCards = -60;
        }
        else if(length > 3){
            spaceBetweenCards = -40;
        }
        else {
            spaceBetweenCards = -15;
        }

        if(blackjack.ORIENTATION === blackjack.LANDSCAPE) {
            spaceBetweenCards = spaceBetweenCards * .25;


            if(length > 5){
                xVal = 250;
            }
            else {
                xVal = 400;
            }
        }
        else {
            xVal = 100;
        }

        xPos = xVal + (cardWidth + spaceBetweenCards) * i;
        move = new lime.animation.MoveTo(xPos, yPos).setDuration(.5).setEasing(lime.animation.Easing.EASEOUT);
        card.runAction(move);
    }
};


blackjack.BlackJackGame.prototype.showComputersCards = function () {
    var length = this.cards.length,
        i,
        card;

    // handle UI cards
    for (i=0; i < length; i += 1) {
        card = this.cards[i];
        if (card.isFaceUp === false) {
            card.turnOverCard();
        }
    }

    length = this.computer.cards.length;
    for (i = 0; i < length; i += 1) {
        card = this.computer.cards[i];
        card.isFaceUp = true;
    }

    length = this.computer.currentHand.length;
    for (i = 0; i < length; i += 1) {
        card = this.computer.currentHand[i];
        card.isFaceUp = true;
    }

    this.computerTotal.setText(this.getHandTotal(this.computer));
};

blackjack.BlackJackGameView.prototype.dealCardFaceUp = function () {
    blackjack.BlackJackGame.prototype.dealCardFaceUp.call(this);

    var index = this.currentPlayer.currentHand.length - 1,
        cardDetails = this.currentPlayer.currentHand[index];

    this.makeCard(cardDetails);
};

blackjack.BlackJackGameView.prototype.dealCardFaceDown = function () {
    blackjack.BlackJackGame.prototype.dealCardFaceDown.call(this);

    var index = this.currentPlayer.currentHand.length - 1,
        cardDetails = this.currentPlayer.currentHand[index];

    this.makeCard(cardDetails);
};

blackjack.BlackJackGameView.prototype.gameOver = function () {
    blackjack.BlackJackGame.prototype.gameOver.call(this);
};

blackjack.BlackJackGameView.prototype.resetThenStart = function () {
    blackjack.BlackJackGame.prototype.resetThenStart.call(this);

    var length = this.cards.length,
        card;

    this.computerTotal.setFontSize(100);
    this.computerTotal.setText('');
    this.computerTotal.setFontColor('#88d52f');


    this.youTotal.setFontSize(100);
    this.youTotal.setText('');
    this.youTotal.setFontColor('#88d52f');

    this.winIncicator.setText('');

    this.turnIndicator.setOpacity(0);
    this.gameLogo.setHidden(false);


    for (var i = 0; i < length; i += 1) {
        card = this.cards[i];
        this.removeChild(card);
    }

    this.cards = [];
};

blackjack.BlackJackGameView.prototype.playerLoses = function () {
    blackjack.BlackJackGame.prototype.playerLoses.call(this);
};

blackjack.BlackJackGameView.prototype.playerChipUsed = function () {
    blackjack.BlackJackGame.prototype.playerChipUsed.call(this);
    this.inventory.removeChip();
    this.hasAnti = false;
};

blackjack.BlackJackGameView.prototype.push = function(){
    blackjack.BlackJackGame.prototype.push.call(this);

    this.winIncicator.setFontColor('#d80000');
    this.winIncicator.setText('PUSH!');
    this.gameLogo.setHidden(true);
};

blackjack.BlackJackGameView.prototype.computerWins = function () {
    blackjack.BlackJackGame.prototype.computerWins.call(this);
    this.youTotal.setFontColor('#d80000');
    this.winIncicator.setFontColor('#d80000');
    this.winIncicator.setText('YOU LOSE!');
    this.gameLogo.setHidden(true);
};

blackjack.BlackJackGameView.prototype.playerWins = function () {
    blackjack.BlackJackGame.prototype.playerWins.call(this);
    this.computerTotal.setFontColor('#d80000');
    this.winIncicator.setFontColor('#88d52f');
    this.winIncicator.setText('YOU WIN!');
    this.gameLogo.setHidden(true);
};

blackjack.BlackJackGameView.prototype.switchPlayer = function() {
    blackjack.BlackJackGame.prototype.switchPlayer.call(this);

    if(blackjack.ORIENTATION === blackjack.LANDSCAPE) {
        if(this.currentPlayer === this.player) {
            if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
                this.turnIndicator.setPosition(250,530);
            }
            else {
                this.turnIndicator.setPosition(250,745);
            }
        }
        else {
            this.turnIndicator.setPosition(250,60);
        }
    }
    else {
        if(this.currentPlayer === this.player) {
            if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
                this.turnIndicator.setPosition(5,530);
            }
            else {
                this.turnIndicator.setPosition(5,745);
            }
        }
        else {
            this.turnIndicator.setPosition(5,60);
        }
    }



//    var move;
//
//    if(this.currentPlayer === this.player) {
//        if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
//            move = new lime.animation.MoveTo(6,530).setDuration(.5).setEasing(lime.animation.Easing.EASEOUT);
//            this.turnIndicator.runAction(move);
//        }
//        else {
//            move = new lime.animation.MoveTo(6,745).setDuration(.5).setEasing(lime.animation.Easing.EASEOUT);
//            this.turnIndicator.runAction(move);
//        }
//    }
//    else {
//        move = new lime.animation.MoveTo(6,530).setDuration(.5).setEasing(lime.animation.Easing.EASEOUT);
//        this.turnIndicator.runAction(move);
//    }

};

blackjack.BlackJackGameView.prototype.waitForInput = function(){
    lime.scheduleManager.callAfter(function(dt){
        var fade = new lime.animation.FadeTo(1).setDuration(.5);
        this.turnIndicator.runAction(fade);
    }, this, 2500);
};



