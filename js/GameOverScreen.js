goog.provide('blackjack.GameOverScreen');
goog.require('blackjack.Button');
goog.require('blackjack.utils.ViewportMonitor');

blackjack.GameOverScreen = function(win, gender){
    blackjack.utils.ViewportMonitor.call(this);

    this.createMessages();

    var background = new lime.Sprite();
    background.setAnchorPoint(0,0);
    background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    this.topLabel = new lime.Label();
    this.topLabel.setFontSize(60);
    this.topLabel.setFontColor('#ffffff');
    this.topLabel.setFontFamily('GothamBold');
    this.topLabel.setFontWeight('bold');
    this.topLabel.setSize(800, 0);

    this.bottomLabel = new lime.Label();
    this.bottomLabel.setFontSize(47);
    this.bottomLabel.setFontColor('#ffffff');
    this.bottomLabel.setFontFamily('GothamBold');
    this.bottomLabel.setFontWeight('bold');
    this.bottomLabel.setSize(800, 0);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        background.setFill('assets/gameOver/endScreenLandscape.png');
        this.topLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 355);
        this.bottomLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 285);
        this.setMessage(win, gender);
    }
    else {
        background.setFill('assets/gameOver/endScreen.png');
        this.topLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 450);
        this.bottomLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 345)
        this.setMessage(win, gender);
    }

    this.appendChild(background);
    this.appendChild(this.topLabel);
    this.appendChild(this.bottomLabel);

    lime.scheduleManager.callAfter(function(dt){

    }, this, 3000);
};

goog.inherits(blackjack.GameOverScreen, blackjack.utils.ViewportMonitor);

blackjack.GameOverScreen.prototype.setMessage = function(win, gender){
    var index;
    if(win) {

        if(gender === blackjack.MAN) {
            index = Math.round((this.messages.win.male.length - 1) * Math.random());
            this.topLabel.setText('YOU WIN!');
            this.bottomLabel.setText(this.messages.win.male[index].text);

        }
        else {
            index = Math.round((this.messages.win.female.length - 1) * Math.random());
            this.topLabel.setText('YOU WIN!');
            this.bottomLabel.setText(this.messages.win.female[index].text);
        }

    }
    else {
        if(gender === blackjack.MAN) {
            index = Math.round((this.messages.lose.male.length - 1) * Math.random());
            this.topLabel.setText('LOSER!');
            this.bottomLabel.setText(this.messages.lose.male[index].text);
        }
        else {
            index = Math.round((this.messages.lose.female.length - 1) * Math.random());
            this.topLabel.setText('LOSER!');
            this.bottomLabel.setText(this.messages.lose.female[index].text);
        }

    }
};

blackjack.GameOverScreen.prototype.createMessages = function(){
    this.messages = blackjack.gameOverConfig;
};
