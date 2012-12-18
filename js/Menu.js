goog.provide('blackjack.Menu');
goog.require('blackjack.Button');
goog.require('blackjack.utils.ViewportMonitor');

blackjack.Menu = function(){
    blackjack.utils.ViewportMonitor.call(this);

    var background = new lime.Sprite();
    background.setAnchorPoint(0,0);
    background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    this.playAsManButton = new blackjack.Button('assets/menu/manButton.png', 'assets/menu/manButtonDown.png');
    this.playAsManButton.setAnchorPoint(.5,.5);

    this.playAsWomanButton = new blackjack.Button('assets/menu/womanButton.png', 'assets/menu/womanButtonDown.png');
    this.playAsWomanButton.setAnchorPoint(.5,.5);

    this.soundButton = new blackjack.Button('assets/soundOffButton.png', 'assets/soundOnButton.png');
    this.soundButton.setAnchorPoint(.5,.5);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        background.setFill('assets/menu/backgroundLandscape.png');
        this.playAsManButton.setPosition(blackjack.WIDTH * .35, blackjack.HEIGHT * .855);
        this.playAsWomanButton.setPosition(blackjack.WIDTH * .65, blackjack.HEIGHT * .855);
        this.soundButton.setPosition(50 , blackjack.HEIGHT - 50);
    }
    else {
        background.setFill('assets/menu/background.png');
        this.playAsManButton.setPosition(blackjack.WIDTH * .26, blackjack.HEIGHT * .84);
        this.playAsWomanButton.setPosition(blackjack.WIDTH * .74, blackjack.HEIGHT * .84);

    }

    this.appendChild(background);
    this.appendChild(this.playAsManButton);
    this.appendChild(this.playAsWomanButton);

//    if(!goog.userAgent.MOBILE) {
//        this.appendChild(this.soundButton);
//    }

};

goog.inherits(blackjack.Menu, blackjack.utils.ViewportMonitor);
