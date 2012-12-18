goog.provide('blackjack.Proof');
goog.require('blackjack.Button');
goog.require('blackjack.utils.ViewportMonitor');

blackjack.Proof = function(){
    blackjack.utils.ViewportMonitor.call(this);

    var background = new lime.Sprite();
    background.setFill('assets/background.jpeg');
    background.setAnchorPoint(0,0);
    background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    this.logo = new lime.Sprite();
    this.logo.setFill('assets/general.gif');
    this.logo.setScale(2.5);
    this.logo.setRotation(90);
    this.logo.setPosition(blackjack.WIDTH * .5, blackjack.HEIGHT * .5);

    this.orientationLabel = new lime.Label();
    this.orientationLabel.setFontColor('#ffffff');
    this.orientationLabel.setFontSize(48);
    this.orientationLabel.setText('');
    this.orientationLabel.setPosition(blackjack.WIDTH * .5, blackjack.HEIGHT * .25);

    this.appendChild(background);
    this.appendChild(this.orientationLabel);
    this.appendChild(this.logo);

    goog.events.listen(this.logo, ['mousedown', 'touchstart'], function(event) {
        event.startDrag();
    }, false, this);
};

goog.inherits(blackjack.Proof, blackjack.utils.ViewportMonitor);

blackjack.Proof.prototype.onDeviceRotated = function(){
    if(this.isRotated === true) {
        this.orientationLabel.setText('Invalid Orientation.');
    }
    else {
        this.orientationLabel.setText('');
    }
};