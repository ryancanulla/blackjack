goog.provide('blackjack.AnimationScreen');

goog.require('blackjack.AnimationManager');
goog.require('blackjack.utils.ViewportMonitor');

blackjack.AnimationScreen = function(gender){
    blackjack.utils.ViewportMonitor.call(this);

    this.winDetails = {};
    this.loseDetails = {};

    this.animationManager = new blackjack.AnimationsManager(gender);

    // call setupNextAnimation() once the list.json is loaded
    lime.scheduleManager.callAfter(function(dt){
        this.setupNextAnimation(gender, 1);
    }, this, 1000);

    this.createChildren();
};

goog.inherits(blackjack.AnimationScreen, blackjack.utils.ViewportMonitor);

blackjack.AnimationScreen.prototype.createChildren = function(){
    var background = new lime.Sprite(),
        desk = new lime.Sprite(),
        chair = new lime.Sprite();

    background.setAnchorPoint(0,0);
    background.setPosition(0,0);
    background.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    chair.setPosition(0,0);
    chair.setAnchorPoint(0,0);
    chair.setFill('assets/game/animation/chair.png');

    desk.setPosition(0,0);
    desk.setAnchorPoint(0,0);
    desk.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        background.setFill('assets/game/animation/backgroundLandscape.png');
        desk.setFill('assets/game/animation/deskLandscape.png');
        chair.setPosition(125, -200);
    }
    else {
        background.setFill('assets/game/animation/background.png');
        desk.setFill('assets/game/animation/desk.png');
    }

    this.winContainer = new lime.Sprite();
    this.loseContainer = new lime.Sprite();

    this.appendChild(background);

    this.appendChild(this.winContainer);
    this.appendChild(this.loseContainer);

    this.appendChild(desk);
    this.chair = chair;

};

blackjack.AnimationScreen.prototype.setupNextAnimation = function(gender, level){
    console.log('setting up next level: ' + level);
    console.log(' ');

    if(gender === blackjack.MAN) {
        this.loseDetails = this.animationManager.manTauntsUser(level)
        this.winDetails = this.animationManager.manLosesItem(level);

    }
    else {
        this.loseDetails = this.animationManager.womanTauntsUser(level)
        this.winDetails = this.animationManager.womanLosesItem(level);
    }

    this.winContainer.setScale(this.winDetails.targetScale);
    this.loseContainer.setScale(this.winDetails.targetScale);

    this.winContainer.setFill(this.winDetails.url + '?=' + (Math.round(Math.random() * 1000)).toString());

    if(this.hasTauntForLevel(level, gender)) {
        this.loseContainer.setFill(this.loseDetails.url + '?=' + (Math.round(Math.random() * 1000)).toString());
    }

    this.winContainer.setHidden(true);
    this.loseContainer.setHidden(true);
};

blackjack.AnimationScreen.prototype.start = function(gender, action, level) {
    console.log('game level:' + level);
    var delay=4000;

    if(action === blackjack.COMPUTER_LOSES_ITEM) {
        this.winContainer.setHidden(false);
        delay = this.winDetails.time;
    }
    else if(action === blackjack.COMPUTER_TAUNTS) {
        this.loseContainer.setHidden(false);
        this.animationManager.playedTaunt(this.loseDetails, gender);
        delay = this.loseDetails.time;
    }

    this.updateAnimationPosition(gender, level);

    lime.scheduleManager.callAfter(function(dt){
        this.dispatchEvent(blackjack.ANIMATION_COMPLETE);

        lime.scheduleManager.callAfter(function(dt){
            this.setupNextAnimation(gender, level);
        }, this, 1000);

    }, this, delay);
};

blackjack.AnimationScreen.prototype.updateAnimationPosition = function(gender, level) {
    if(blackjack.ORIENTATION === blackjack.LANDSCAPE) {
        if(gender === blackjack.MAN) {
        	/*if (level == 2) {
	        	this.winContainer.setPosition(750, 384);
	        }
	        else if (level == 1) {
	        	this.loseContainer.setPosition(750, 384);
        	} else if(level > 4) {
                this.winContainer.setPosition(675 , 395);
                this.loseContainer.setPosition(675 , 395);
            }
            else {
                this.winContainer.setPosition(675, 295);
                this.loseContainer.setPosition(675, 295);
            }*/
            
            this.winContainer.setPosition(750, 384);
	        this.loseContainer.setPosition(750, 384);
        }
        else {
            /*if(level > 4) {
                this.winContainer.setPosition(675 , 395);
                this.loseContainer.setPosition(675 , 395);
            }
            else {
                this.winContainer.setPosition(675, 335);
                this.loseContainer.setPosition(675, 335);
            }*/
            this.winContainer.setPosition(750, 384);
	        this.loseContainer.setPosition(750, 384);
        }

    }
    else {
        if(gender === blackjack.MAN) {
            if(level > 4) {
                this.winContainer.setPosition(500 , 600);
                this.loseContainer.setPosition(500 , 600);
            }
            else {
                this.winContainer.setPosition(500 , 530);
                this.loseContainer.setPosition(500 , 530);
            }
        }
        else {
            if(level > 4) {
                this.winContainer.setPosition(500 , 600);
                this.loseContainer.setPosition(500 , 600);
            }
            else {
                this.winContainer.setPosition(450 , 580);
                this.loseContainer.setPosition(450 , 580);
            }
        }

    }
};

blackjack.AnimationScreen.prototype.hasTauntForLevel = function(level, gender) {
    return this.animationManager.hasTauntForLevel(level, gender)
};


