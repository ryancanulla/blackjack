goog.provide('blackjack.BlackJackGame');
goog.require('blackjack.Button');
goog.require('blackjack.CardGame');

blackjack.BlackJackGame = function(gender){
    blackjack.CardGame.call(this);

    this.isPlayerTurn = false;
    this.checkedForBlackjack = false;
    this.handOver = true;

    this.player = {
        name:'YOU',
        currentHand:[],
        cards:[],
        showing:0,
        score:0,
        inventoryItems:blackjack.INVENTORY_ITEMS,
        busted:false,
        level:1
    };
    this.computer = {
        name:gender,
        gender:gender,
        currentHand:[],
        cards:[],
        showing:0,
        score:0,
        inventoryItems:blackjack.INVENTORY_ITEMS,
        busted:false,
        level:1
    };

    this.currentPlayer = this.player;
};

goog.inherits(blackjack.BlackJackGame, blackjack.CardGame);

blackjack.BlackJackGame.prototype.start = function(){
    this.handOver = false;
    blackjack.playSound(blackjack.SHUFFEL_SOUND);
    lime.scheduleManager.callAfter(function(dt){
        this.dealPlayerCards();
        this.switchPlayer();

        lime.scheduleManager.callAfter(function(dt){
            if(!this.handOver){
                this.dealComputerCards();
                this.switchPlayer();
                this.waitForInput();
            }
        }, this, blackjack.PAUSE_BETWEEN_DEALING);
    }, this, blackjack.START_DELAY);
};

blackjack.BlackJackGame.prototype.waitForInput = function(){

};

blackjack.BlackJackGame.prototype.dealPlayerCards = function(){
    this.dealCardFaceUp();
    this.dealCardFaceUp();
};

blackjack.BlackJackGame.prototype.dealComputerCards = function(){
    this.dealCardFaceDown();
    this.dealCardFaceUp();
};

blackjack.BlackJackGame.prototype.checkForBlackJack = function(){
    if(this.hasBlackJack(this.player) && this.hasBlackJack(this.computer)) {
        this.push()
        this.handOver = true;
    }
    else if(this.hasBlackJack(this.player)) {
        this.playerWins();
        this.handOver = true;
    }
    else if(this.hasBlackJack(this.computer)) {
        this.playerLoses();
        this.handOver = true;
    }
};


blackjack.BlackJackGame.prototype.hasBlackJack = function(person){
    var cards = person.currentHand,
        length = cards.length,
        i = 0 ,
        card,
        hasAce,
        hasFaceCard;

    for(i; i<length; i+=1) {
        card = cards[i];

        if(card.value === 10 && card.hasBeenDealt) {
            hasFaceCard = true;
        }

        if(card.card === blackjack.ACE && card.hasBeenDealt) {
            hasAce = true;
        }
    }
    return (length === 2) && hasAce && hasFaceCard;
};

blackjack.BlackJackGame.prototype.dealCardFaceDown = function(){
    var newCard = this.getCard();
    newCard.isFaceUp = false;
    newCard.owner = this.currentPlayer;

    this.currentPlayer.currentHand.push(newCard);
};

blackjack.BlackJackGame.prototype.getHandTotal = function(person){
    var cards = person.currentHand,
        aces = [],
        length = cards.length,
        i = 0,
        card,
        total = 0;

    for(i; i < length; i+=1) {
        card = cards[i];

        if(card.isFaceUp && card.hasBeenDealt) {
            if(card.card === blackjack.ACE) {
                aces.push(card);
            }
            else {
                total += card.value;
            }
        }
    }

    i=0;
    length = aces.length;

    if(length > 0) {
        for(i; i<length; i+=1) {
            if((total + 11) > 21) {
                total += 1;
            }
            else {
                total += 11;
            }
        }
    }
    return total;
};

blackjack.BlackJackGame.prototype.dealCardFaceUp = function(){
    var newCard = this.getCard();

    newCard.isFaceUp = true;
    newCard.owner = this.currentPlayer;

    this.currentPlayer.currentHand.push(newCard);
};

blackjack.BlackJackGame.prototype.gameOver = function(){

};

blackjack.BlackJackGame.prototype.switchPlayer = function(){
    if(this.currentPlayer === this.player){
        this.currentPlayer = this.computer;
        this.isPlayerTurn = false;
    }
    else {
        this.currentPlayer = this.player;
        this.isPlayerTurn = true;
    }
};


blackjack.BlackJackGame.prototype.onHit = function(){
    if(this.isDealing === true) {
        return;
    }

    this.dealCardFaceUp();
    this.isDealing = true;

    lime.scheduleManager.callAfter(function(dt){
        if(this.playerIsBusted()) {
            this.isDealing = false;
            this.handOver = true;
            this.handleBust();
        }
        else if(this.playerShouldStand()) {
            this.isDealing = false;
            this.onStand();
        }
        else {
            // wait for user input
        }
        this.isDealing = false;

    }, this, blackjack.PAUSE_BEFORE_BUST);
};

blackjack.BlackJackGame.prototype.playerShouldStand = function(){
    var person = this.currentPlayer,
        total = this.getHandTotal(person);

    if(total === 21) {
        return true;
    }
    return false;
};

blackjack.BlackJackGame.prototype.onStand = function(){
    if(this.isDealing === true) {
        return;
    }

        this.switchPlayer();
        this.showComputersCards();
        this.makeDecisionForComputer();
};

blackjack.BlackJackGame.prototype.playerIsBusted = function(){

    var total = this.getHandTotal(this.currentPlayer);

    if(total > 21) {
        this.currentPlayer.busted = true;
        return true;
    }
    return false;
};

blackjack.BlackJackGame.prototype.showComputersCards = function(){

};

blackjack.BlackJackGame.prototype.makeDecisionForComputer = function(){
    if(this.getHandTotal(this.computer) < 17){
        this.dealCardFaceUp();

        lime.scheduleManager.callAfter(function(dt){

            if(this.playerIsBusted()) {
                this.handleBust();
            }
            else {
                this.makeDecisionForComputer();
            }
        }, this, blackjack.PAUSE_BEFORE_BUST);
    }
    else {
        this.decideWinner();
    }
};

blackjack.BlackJackGame.prototype.decideWinner = function(){
    var push = this.getHandTotal(this.player) === this.getHandTotal(this.computer);

    if(push) {
       this.push();
    }
    else {
        this.handleWin();
    }
};

blackjack.BlackJackGame.prototype.handleWin = function(){
    var playerTotal = this.getHandTotal(this.player),
        computerTotal = this.getHandTotal(this.computer);

    if(playerTotal > computerTotal) {
        this.playerWins();
        this.computerLoses();
    }
    else {
        this.computerWins();
        this.playerLoses();
    }
}

blackjack.BlackJackGame.prototype.handleBust = function(){
    var player = this.player;

    if(player.busted) {
        this.computerWins();
        this.playerLoses();
    }
    else {
        this.playerWins();
        this.computerLoses();
    }
}

blackjack.BlackJackGame.prototype.push = function(){
    lime.scheduleManager.callAfter(function(dt){
        this.resetThenStart();
    }, this, blackjack.WIN_DELAY);
}

blackjack.BlackJackGame.prototype.computerWins = function(){

}

blackjack.BlackJackGame.prototype.computerLoses = function(){

};

blackjack.BlackJackGame.prototype.playerWins = function(){
    blackjack.playSound(blackjack.WIN_SOUND);
    this.player.level +=1;
    this.handOver = true;

    if(this.player.level === blackjack.TOTAL_GAME_LEVELS){
        this.gameOver = true;
    }

    lime.scheduleManager.callAfter(function(dt){
        this.dispatchEvent(blackjack.PLAYER_WINS);
    }, this, blackjack.WIN_DELAY);

}

blackjack.BlackJackGame.prototype.playerLoses = function(){
    this.computer.level +=1;
    this.playerChipUsed();
    blackjack.playSound(blackjack.LOSE_SOUND);
    this.handOver = true;

    lime.scheduleManager.callAfter(function(dt){
        if(this.player.inventoryItems === 0) {
            this.gameOver = true;
        }
        this.dispatchEvent(blackjack.PLAYER_LOSES);
    }, this, blackjack.WIN_DELAY);


};

blackjack.BlackJackGame.prototype.playerChipUsed = function(){
    this.player.inventoryItems -= 1;
};


blackjack.BlackJackGame.prototype.reset = function(){
        blackjack.CardGame.prototype.reset.call(this);
        this.currentPlayer = this.player;
        this.resetPlayer(this.player);
        this.resetPlayer(this.computer);
};


blackjack.BlackJackGame.prototype.resetThenStart = function(){
    blackjack.CardGame.prototype.reset.call(this);

    this.isPlayerTurn = false;
    this.checkedForBlackjack = false;
    this.gameOver = false;

    this.currentPlayer = this.player;
    this.resetPlayer(this.player);
    this.resetPlayer(this.computer);
    this.start();
};

blackjack.BlackJackGame.prototype.resetPlayer = function(player){
    player.currentHand = [];
    player.cards = [];
    player.showing = 0;
    player.busted = false;
    player.showAllCards = false;
};

