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
    this.topLabel.setFontSize(80);
    this.topLabel.setFontColor('#ffffff');
    this.topLabel.setFontFamily('Arial');
    this.topLabel.setFontWeight('bold');
    this.topLabel.setSize(800, 0);

    this.bottomLabel = new lime.Label();
    this.bottomLabel.setFontSize(57);
    this.bottomLabel.setFontColor('#ffffff');
    this.bottomLabel.setFontFamily('Arial');
    this.bottomLabel.setFontWeight('bold');
    this.bottomLabel.setSize(800, 0);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        background.setFill('assets/gameOver/endScreenLandscape.png');
        this.topLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 355);
        this.bottomLabel.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT - 260);
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
        this.messages = {
            win: {
                male:[
                    {text:"NOTHING FOR THE MAN. EVERYTHING FOR YOU."},
                    {text:"YOU: 1. THE MAN: NOTHING!"},
                    {text:"YOU STRIPPED HIM. HE'S GONNA BE MAD."}
                ],
                female:[
                    {text:"YOU TOOK IT ALL! EVEN HER PRIDE."},
                    {text:"WATCH OUT. SHE'S GONNA BE LOOKING FOR YOU."},
                    {text:"SOMEONE AIN'T SO SMUG NOW."}
                ]
            },
            lose:{
                male:[
                    {text:"GUESS THE MAN STILL OWNS YOU."},
                    {text:"YOU GOT WHIPPED. WANNA TRY AGAIN?"},
                    {text:"THAT WAS WEAK. TRY AGAIN."}
                ],
                female:[
                    {text:"THAT MUST HAVE HURT 'CAUSE YOU GOT CRUSHED."},
                    {text:"HOPE NO BROS SAW YOU LOSE TO A GIRL."},
                    {text:"YOU GOT PWNED."}
                ]
            }
        };
};
