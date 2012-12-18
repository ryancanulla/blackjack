goog.provide('blackjack.GameOverScreen');
goog.require('blackjack.Button');
goog.require('blackjack.utils.ViewportMonitor');

blackjack.GameOverScreen = function(win, gender){
    blackjack.utils.ViewportMonitor.call(this);

    this.createMessages();

    var background = new lime.Sprite();
    background.setAnchorPoint(0,0);
    background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    this.playAgainButton = new blackjack.Button('assets/gameOver/playAgainButton.png', 'assets/gameOver/playAgainButtonDown.png');
    this.playAgainButton.setAnchorPoint(.5,.5);

    this.messageLabel = new lime.Label();
    this.messageLabel.setFontSize(60);
//    this.messageLabel.setAnchorPoint(.5, .5);
    this.messageLabel.setFontColor('#ffffff');
    this.messageLabel.setFontFamily('Gotham');

    this.messageLabel.setSize(800, 0);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        background.setFill('assets/gameOver/endScreenLandscape.png');
        this.playAgainButton.setPosition(blackjack.WIDTH * .5, blackjack.HEIGHT * .55);
        this.playAgainButton.setScale(2);
        this.messageLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 345);

        this.setMessage(win, gender);
    }
    else {
        background.setFill('assets/gameOver/endScreen.png');
        this.playAgainButton.setPosition(blackjack.WIDTH * .5, blackjack.HEIGHT *.55);
        this.playAgainButton.setScale(1.5);
        this.messageLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 450);

        this.setMessage(win, gender);
    }

    this.appendChild(background);
    this.appendChild(this.messageLabel)
    this.appendChild(this.playAgainButton);
};

goog.inherits(blackjack.GameOverScreen, blackjack.utils.ViewportMonitor);

blackjack.GameOverScreen.prototype.setMessage = function(win, gender){
    var index;
    if(win) {

        if(gender === blackjack.MAN) {
            index = Math.round((this.messages.win.male.length - 1) * Math.random());
            this.messageLabel.setText(this.messages.win.male[index].text);
        }
        else {
            index = Math.round((this.messages.win.female.length - 1) * Math.random());
            this.messageLabel.setText(this.messages.win.female[index].text);
        }

    }
    else {


        if(gender === blackjack.MAN) {
            index = Math.round((this.messages.lose.male.length - 1) * Math.random());
            this.messageLabel.setText(this.messages.lose.male[index].text);
        }
        else {
            index = Math.round((this.messages.lose.female.length - 1) * Math.random());
            this.messageLabel.setText(this.messages.lose.female[index].text);
        }

    }
};

blackjack.GameOverScreen.prototype.createMessages = function(){
        this.messages = {
            win: {
                male:[
                    {text:"Nothing for the man. Everything for you. That's what we're talking about."},
                    {text:"You: 1. The Man: Nothing!"},
                    {text:"WINNER! You stripped The Man of his stuff. He's gonna be mad."}
                ],
                female:[
                    {text:"You took it all! Even her pride."},
                    {text:"Better watch out. The (wo)Man is going to come looking for you."},
                    {text:"She isn't looking so smug now."}
                ]
            },
            lose:{
                male:[
                    {text:"L-o-o--o-o-s-e-r! Better try again."},
                    {text:"You got whipped. The man is game to go again. Are you?"},
                    {text:"Guess the man still owns you."}
                ],
                female:[
                    {text:"Ouch. That must have hurt 'cause you got crushed!"},
                    {text:"Hope none of your friends saw you lose to a girl."},
                    {text:"You got pwned!"}
                ]
            }
        };
};
