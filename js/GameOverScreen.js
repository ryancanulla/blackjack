goog.provide('blackjack.GameOverScreen');

goog.require('blackjack.utils.ViewportMonitor');

blackjack.GameOverScreen = function(win, gender, level){
    blackjack.utils.ViewportMonitor.call(this);

    var genderPath,
        levelPath;

    this.createMessages();

    var background = new lime.Sprite();
    background.setAnchorPoint(0,0);
    background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    var bottom = new lime.Sprite();
    bottom.setAnchorPoint(0,1);

    if(gender === blackjack.MAN) {
        genderPath = 'man';
    }
    else {
        genderPath = 'woman';
    }

    if(win) {
        levelPath = ('win.png').toString();
    }
    else {
        levelPath = ('img' + level + '.png').toString();
    }

    var person = new lime.Sprite();
    person.setFill('assets/gameOver/' + genderPath + '/' + levelPath);

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
        background.setFill('assets/gameOver/backgroundLandscape.png');

        bottom.setFill('assets/gameOver/bottomLandscape.png');
        bottom.setSize(blackjack.WIDTH, 400);
        bottom.setPosition(0, blackjack.HEIGHT + 10);

        person.setScale(1.4);
        person.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT *.5);

        this.topLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 225);
        this.bottomLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 155);
        this.setMessage(win, gender);
    }
    else {
        background.setFill('assets/gameOver/background.png');

        bottom.setFill('assets/gameOver/bottom.png');
        bottom.setSize(blackjack.WIDTH, 500);
        bottom.setPosition(0, blackjack.HEIGHT + 10);

        person.setScale(1.75);
        person.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT *.5);

        this.topLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 325);
        this.bottomLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 220)
        this.setMessage(win, gender);
    }

    this.appendChild(background);
    this.appendChild(person);
    this.appendChild(bottom);
    this.appendChild(this.topLabel);
    this.appendChild(this.bottomLabel);

    lime.scheduleManager.callAfter(function(dt){
        try {
            parent.BlackjackOverlay.showForm();
            soundManager.stopAll();
        }
        catch (e) {

        }
    }, this, 6000);
};

goog.inherits(blackjack.GameOverScreen, blackjack.utils.ViewportMonitor);

blackjack.GameOverScreen.prototype.setMessage = function(win, gender){
    var index,
        message;
    if(win) {

        if(gender === blackjack.MAN) {
            index = Math.round((this.messages.win.male.length - 1) * Math.random());
            this.topLabel.setText('YOU WIN!');
            this.bottomLabel.setText(this.messages.win.male.splice(index,1)[0].text);
        }
        else {
            index = Math.round((this.messages.win.female.length - 1) * Math.random());
            this.topLabel.setText('YOU WIN!');
            this.bottomLabel.setText(this.messages.win.female.splice(index,1)[0].text);
        }

    }
    else {
        if(gender === blackjack.MAN) {
            index = Math.round((this.messages.lose.male.length - 1) * Math.random());
            this.topLabel.setText('LOSER!');
            this.bottomLabel.setText(this.messages.lose.male.splice(index,1)[0].text);
        }
        else {
            index = Math.round((this.messages.lose.female.length - 1) * Math.random());
            this.topLabel.setText('LOSER!');
            this.bottomLabel.setText(this.messages.lose.female.splice(index,1)[0].text);
        }

    }
};

blackjack.GameOverScreen.prototype.createMessages = function(){
    this.messages = blackjack.gameOverConfig;
};
