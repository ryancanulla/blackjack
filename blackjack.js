//set main namespace
goog.provide('blackjack');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');

goog.require('blackjack.Proof');
goog.require('blackjack.Preload');
goog.require('blackjack.AnimationScreen');
goog.require('blackjack.Menu');
goog.require('blackjack.BlackJackGameView');
goog.require('blackjack.GameOverScreen');


goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.SlideInRight');
goog.require('lime.transitions.SlideInLeft');
goog.require('lime.transitions.MoveInRight');

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function(s) {
	if (goog.dom.getElement("debug") && blackjack.DEBUG) {
		goog.dom.getElement("debug").innerHTML += "<br/>"+s;
	}
};

blackjack.soundOn = true;
blackjack.DEBUG = true;

blackjack.ORIENTATION = '';
blackjack.PORTRAIT = 'portrait';
blackjack.LANDSCAPE = 'landscape';

blackjack.TOTAL_GAME_LEVELS = 10;
blackjack.INVENTORY_ITEMS = 10;

blackjack.SPACE_BETWEEN_CARDS = -25;

blackjack.TWO = '2';
blackjack.THREE = '3';
blackjack.FOUR = '4';
blackjack.FIVE = '5';
blackjack.SIX = '6';
blackjack.SEVEN = '7';
blackjack.EIGHT = '8';
blackjack.NINE = '9';
blackjack.TEN = '10';
blackjack.JACK = 'J';
blackjack.QUEEN = 'Q';
blackjack.KING = 'K';
blackjack.ACE = 'A';

blackjack.MAN = 'THE MAN';
blackjack.WOMAN = 'THE WOMAN';

blackjack.WIN_DELAY = 2500;
blackjack.START_DELAY = 500;
blackjack.PAUSE_BETWEEN_DEALING = 1000;
blackjack.PAUSE_BEFORE_BUST = 2000;
blackjack.PAUSE_FOR_BLACKJACK_CHECK = 1000;

blackjack.DIAMOND = 'diamond';
blackjack.SPADES = 'spades';
blackjack.HEARTS = 'hearts';
blackjack.CLUBS = 'clubs';

blackjack.PLAYER_WINS = 'playerWins';
blackjack.PLAYER_LOSES = 'playerLoses';
blackjack.GAME_OVER = 'gameOver';

blackjack.PLAY_ANIMATION = 'playAnimation';
blackjack.ANIMATION_COMPLETE = 'animationComplete';
blackjack.COMPUTER_LOSES_ITEM = 'manLosesItem';
blackjack.COMPUTER_TAUNTS = 'manTaunts';

blackjack.WIN = true;
blackjack.LOSE = false;

blackjack.PLAY_SOUND = true;
blackjack.CLICK_SOUND = 'click';
blackjack.SHUFFEL_SOUND = 'shuffle';
blackjack.DEAL_CARD_SOUND = 'dealCard';
blackjack.WIN_SOUND = 'win';
blackjack.LOSE_SOUND = 'lose';
blackjack.BACKGROUND_SOUND = 'background';

blackjack.startMobile = function(){
    var element = document.getElementById('blackjack');
    blackjack.ORIENTATION = blackjack.PORTRAIT;
    blackjack.WIDTH = 980;
    blackjack.HEIGHT = 1280;
    blackjack.director = new lime.Director(element, blackjack.WIDTH, blackjack.HEIGHT);

    blackjack.defaultTransition = null;
    blackjack.transitionDelay = 1;

    this.setup();
    this.createSoundManager();
    this.showPreloader();
};

blackjack.startDesktop = function(){
    var element = document.getElementById('blackjack');
    blackjack.ORIENTATION = blackjack.LANDSCAPE;
    blackjack.WIDTH = 1500;
    blackjack.HEIGHT = 980;
    blackjack.director = new lime.Director(element, blackjack.WIDTH, blackjack.HEIGHT);

    blackjack.defaultTransition = lime.transitions.MoveInRight;
    blackjack.transitionDelay = 1;

    this.setup();
    this.createSoundManager();
    this.showPreloader();
};

blackjack.setup = function(){
    lime.Label.defaultFont = 'HungerGames';
    lime.Label.installFont('HungerGames', 'assets/fonts/HungerGames.ttf');

    lime.Label.installFont('Gotham', 'assets/fonts/GOTHAM-U.ttf');
    lime.Label.installFont('GothamBold', 'assets/fonts/GOTHAM-BOLD.TTF');
    lime.Label.installFont('Rock', 'assets/fonts/ROCKWESB.ttf');

    goog.net.XhrIo.send('assets/gameOver/gameOverConfig.json', function(e) {
        var xhr = e.target;
        var obj = xhr.getResponseJson();
        blackjack.gameOverConfig = obj;
    });
};


blackjack.createSoundManager = function(){
    if(goog.userAgent.MOBILE || blackjack.soundOn === false) {
        return;
    }

    soundManager.setup({
        url: 'assets/lib/swf/',
        onready: function() {
            soundManager.createSound({
                id: blackjack.BACKGROUND_SOUND,
                url: 'assets/audio/loop.mp3',
                autoLoad:true,
                volume: 25,
                loops: 1000
            });

            soundManager.createSound({
                id: blackjack.DEAL_CARD_SOUND,
                url: 'assets/audio/card_to_table.mp3',
                autoLoad:true,
                volume: 100
            });

            soundManager.createSound({
                id: blackjack.CLICK_SOUND,
                url: 'assets/audio/button_click.mp3',
                autoLoad:true,
                volume: 100
            });

            soundManager.createSound({
                id: blackjack.SHUFFEL_SOUND,
                url: 'assets/audio/shuffle.mp3',
                autoLoad:true,
                volume: 100
            });

            soundManager.createSound({
                id: blackjack.WIN_SOUND,
                url: 'assets/audio/win_bell.mp3',
                autoLoad:true,
                volume: 50
            });

            soundManager.createSound({
                id: blackjack.LOSE_SOUND,
                url: 'assets/audio/lose_buzz.mp3',
                autoLoad:true,
                volume: 50
            });
        }
    });
    soundManager.debugMode = false;
};

blackjack.showPreloader = function(){
    var preloadScene = new blackjack.Preload();
    blackjack.director.replaceScene(preloadScene, blackjack.defaultTransition, blackjack.transitionDelay);

    goog.events.listen(preloadScene, 'complete', function() {
        blackjack.playSound(blackjack.BACKGROUND_SOUND);
        blackjack.goToMenuScene();
    }, false, this);
};

blackjack.goToMenuScene = function(){
    var menu = new blackjack.Menu();
    blackjack.director.replaceScene(menu, blackjack.defaultTransition, blackjack.transitionDelay);

    goog.events.listen(menu.playAsManButton, ['mousedown', 'touchstart'], function() {
        blackjack.playSound(blackjack.CLICK_SOUND);
        this.startGame(blackjack.MAN);
        this.trackEvent('Game_start', 'Click_man');
    }, false, this);

    goog.events.listen(menu.playAsWomanButton, ['mousedown', 'touchstart'], function() {
        blackjack.playSound(blackjack.CLICK_SOUND);
        this.startGame(blackjack.WOMAN);
        this.trackEvent('Game_start', 'Click_woman');

    }, false, this);

    goog.events.listen(menu.soundButton, ['mousedown', 'touchstart'], function() {
        this.toggleSound();
    }, false, this);
};

blackjack.startGame = function(gender){
    var game = new blackjack.BlackJackGameView(gender),
        animation = new blackjack.AnimationScreen(gender);

    blackjack.player = game.player;

    blackjack.director.replaceScene(game, blackjack.defaultTransition, blackjack.transitionDelay);

    /*
    *   Handle Win
    */
    goog.events.listen(game, blackjack.PLAYER_WINS, function() {
        if(game.computer.gender === blackjack.MAN) {
            animation.start(blackjack.MAN, blackjack.COMPUTER_LOSES_ITEM, game.player.level);

        }
        else {
            animation.start(blackjack.WOMAN, blackjack.COMPUTER_LOSES_ITEM, game.player.level);
        }

        this.director.replaceScene(animation, blackjack.defaultTransition, blackjack.transitionDelay);
    }, false, this);

    /*
     *   Handle Loss
     */
    goog.events.listen(game, blackjack.PLAYER_LOSES, function() {

        if(game.player.inventoryItems === 0){
            this.goToGameOverScreen(false, gender, game.player.level);
            this.trackEvent('Game_plays', 'Lose');
            return;
        }
        
        goog.dom.getElement('debug').innerHTML += "<br/>PLAYER LOSES event";

        // if the playe has a taunt, then play it
        if(animation.hasTauntForLevel(game.player.level, gender)) {
            if(game.computer.gender === blackjack.MAN) {
                animation.start(blackjack.MAN, blackjack.COMPUTER_TAUNTS, game.player.level);
            }
            else {
                animation.start(blackjack.WOMAN, blackjack.COMPUTER_TAUNTS, game.player.level);
            }
            this.director.replaceScene(animation, blackjack.defaultTransition, blackjack.transitionDelay);
        }
        else {
            // if they have seen all of the available taunts
            // then just restart the game
            game.resetThenStart();
        }

    }, false, this);

    /*
     *   Handle Animation Complete
     */
    goog.events.listen(animation, blackjack.ANIMATION_COMPLETE, function() {
        var isFinalAnimation = game.player.level > blackjack.TOTAL_GAME_LEVELS;

        if(isFinalAnimation){
            this.goToGameOverScreen(true, gender, game.player.level);
            this.trackEvent('Game_plays', 'Win');
        }
        else {
            game.resetThenStart();
            blackjack.director.replaceScene(game, blackjack.defaultTransition, blackjack.transitionDelay);
        }

    }, false, this);
};

blackjack.goToGameOverScreen = function(isWin, gender, level){
    var screen = new blackjack.GameOverScreen(isWin, gender, level);

    lime.scheduleManager.callAfter(function(dt){
        blackjack.director.replaceScene(screen, blackjack.defaultTransition, blackjack.transitionDelay);
    }, this, 1500);
};

blackjack.toggleSound = function(sound){
    blackjack.soundOn = !blackjack.soundOn;

    if(blackjack.soundOn) {
        soundManager.unmuteAll();
    }
    else {
        soundManager.muteAll();
    }
}

blackjack.playSound = function(sound){
    if(goog.userAgent.MOBILE || blackjack.soundOn === false) {
        return;
    }
    soundManager.play(sound);
}

blackjack.trackEvent = function(group, type){
    try {
        _gaq.push(['_trackEvent', group, type]);
    }
    catch (e){
        console.log('tracking error: ' + e);
    }
}

blackjack.resetSound = function(){
    blackjack.playSound(blackjack.BACKGROUND_SOUND);
}

goog.exportSymbol('blackjack.start', blackjack.start);
