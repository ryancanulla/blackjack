goog.provide('blackjack.AnimationScreen');

goog.require('blackjack.AnimationManager');
goog.require('blackjack.utils.ViewportMonitor');
goog.require('goog.ui.media.FlashObject');
goog.require('goog.userAgent');


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

    if (!goog.userAgent.IE) {
    	this.winContainer = new lime.Sprite();
    	this.loseContainer = new lime.Sprite();
    }

    this.appendChild(background);
    
    if (!goog.userAgent.IE) {
    	this.appendChild(this.winContainer);
    	this.appendChild(this.loseContainer);
    }

    this.appendChild(desk);
    this.chair = chair;

};

blackjack.AnimationScreen.prototype.clearFlashPreload = function() {
	var el = goog.dom.getElement('flash');
	el.innerHTML = "";
};

blackjack.AnimationScreen.prototype.preloadFlash = function(url) {
	var f = new goog.ui.media.FlashObject(url);
	f.render(goog.dom.getElement('flash'));
	goog.dom.getElement('flash').innerHTML += "<br/> Flash: "+Math.random();
};

blackjack.AnimationScreen.prototype.setupNextAnimation = function(gender, level){
	//create new lose container each time so for stuff and thing
	if (goog.userAgent.IE) {
		this.loseContainer = new lime.Sprite();
		this.winContainer = new lime.Sprite();
		this.appendChild(this.loseContainer);
		this.appendChild(this.winContainer);
	}

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
    
    this.clearFlashPreload();
    
    //setup win details
    if (goog.userAgent.IE && this.winDetails.hasOwnProperty("flash")) {
		    this.winfl = new goog.ui.media.FlashObject(this.winDetails.flash.url);
        	var flWidth = this.winDetails.flash.width | 720;
			var flHeight = this.winDetails.flash.height | 372;
		    this.winfl.setSize(flWidth,flHeight);
		    this.winfl.setBackgroundColor("#FFFFFF");
		    
		    //do preload
		    this.preloadFlash(this.winDetails.flash.url);
        } else {
	        this.winContainer.setFill(this.winDetails.url + '?=' + (Math.round(Math.random() * 1000)).toString());
        }

        
    //set up lose details, if necessary
    if(this.hasTauntForLevel(level, gender)) {
        if (goog.userAgent.IE && this.loseDetails.hasOwnProperty("flash")) {
		    this.losefl = new goog.ui.media.FlashObject(this.loseDetails.flash.url);
			var flWidth = this.loseDetails.flash.width | 720;
			var flHeight = this.loseDetails.flash.height | 372;
		    this.losefl.setSize(flWidth,flHeight);
		    this.losefl.setBackgroundColor("#FFFFFF");
		    
		    this.preloadFlash(this.loseDetails.flash.url);
        } else {
        	this.loseContainer.setFill(this.loseDetails.url + '?=' + (Math.round(Math.random() * 1000)).toString());
        }
    }

    this.winContainer.setHidden(true);
    this.loseContainer.setHidden(true);
};

blackjack.AnimationScreen.prototype.start = function(gender, action, level) {
    var delay=4000;
    var fl = null;

    if(action === blackjack.COMPUTER_LOSES_ITEM) {
        this.winContainer.setHidden(false);
        delay = this.winDetails.time;
        
        if (goog.userAgent.IE && this.winDetails.hasOwnProperty('flash')) {
        	fl = this.winfl;
			this.winfl.render(this.winContainer.getDeepestDomElement());
		}
    }
    else if(action === blackjack.COMPUTER_TAUNTS) {
        this.loseContainer.setHidden(false);
        this.animationManager.playedTaunt(this.loseDetails, gender);
        delay = this.loseDetails.time;
        
        if (goog.userAgent.IE && this.loseDetails.hasOwnProperty('flash')) {
        	fl = this.losefl;
        	goog.dom.getElement('debug').innerHTML += "<br/>Render Flash";
	    	this.losefl.render(this.loseContainer.getDeepestDomElement());
	    }
    }
    
    if (fl) {
    	var flWidth = parseInt(fl.width_);
    	var flHeight = parseInt(fl.height_);
		fl.getElement().style.position = "relative";
		fl.getElement().style.top = ((-1*flHeight)/2)+"px";
		fl.getElement().style.left = ((-1*flWidth)/2)+"px";
	}

    this.updateAnimationPosition(gender, level);

    lime.scheduleManager.callAfter(function(dt){
        this.dispatchEvent(blackjack.ANIMATION_COMPLETE);
        
        if (this.loseContainer) this.removeChild(this.loseContainer);

        lime.scheduleManager.callAfter(function(dt){
            if(level < blackjack.TOTAL_GAME_LEVELS + 1) {
                this.setupNextAnimation(gender, level);
            }

        }, this, 1000);

    }, this, delay);
};

blackjack.AnimationScreen.prototype.updateAnimationPosition = function(gender, level) {
    if(blackjack.ORIENTATION === blackjack.LANDSCAPE) {
            this.winContainer.setPosition(750, 384);
	        this.loseContainer.setPosition(750, 384);
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


