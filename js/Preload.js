goog.provide('blackjack.Preload');

goog.require('blackjack.utils.ViewportMonitor');
goog.require('lime.animation.ScaleTo');
goog.require('goog.net.ImageLoader');
goog.require('goog.events.EventType');



blackjack.Preload = function(){
    blackjack.utils.ViewportMonitor.call(this);
    this.createChildren();
};

goog.inherits(blackjack.Preload, blackjack.utils.ViewportMonitor);

blackjack.Preload.prototype.createChildren = function(){
    var container = new lime.Sprite(),
        title = new lime.Label(),
        bar = new lime.Sprite(),
        barWidth = 245,
        barHeight = 10;

    container.setSize(blackjack.WIDTH, blackjack.HEIGHT);

    title.setText('LOADING');
    title.setFontColor('#FFFFFF');
    title.setFontSize(48);
    title.setAnchorPoint(.5,.5);
    title.setSize(400,50);

    bar.setFill('#FFFFFF');
    bar.setAnchorPoint(0,0);
    bar.setSize(245, 10);
    bar.setScale(0,1);

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        title.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT / 2);
    }
    else {
        title.setPosition(blackjack.WIDTH / 2, blackjack.HEIGHT / 2);
    }

    this.titleLabel = title;

    container.appendChild(title);
    container.appendChild(bar);
    this.appendChild(container);

    lime.scheduleManager.callAfter(function(dt){
        this.preload();
    }, this, 1500);
};

blackjack.Preload.prototype.preload = function(){
    var images,
        loaded,
        total,
        self = this;

    var imagesPortait = [
        {url: 'assets/menu/background.png'},
        {url: 'assets/game/background.png'},
        {url: 'assets/game/animation/background.png'},
        {url: 'assets/game/animation/desk.png'},
        {url: 'assets/gameOver/background.png'},
        {url: 'assets/gameOver/bottom.png'}
    ];

    var imagesLandscape = [
        {url: 'assets/menu/backgroundLandscape.png'},
        {url: 'assets/game/backgroundLandscape.png'},
        {url: 'assets/game/animation/backgroundLandscape.png'},
        {url: 'assets/game/animation/deskLandscape.png'},
        {url: 'assets/gameOver/backgroundLandscape.png'},
        {url: 'assets/gameOver/bottomLandscape.png'}
    ];

    var gameImgages = [
        {url: 'assets/menu/manButton.png'},
        {url: 'assets/menu/manButtonDown.png'},
        {url: 'assets/menu/womanButton.png'},
        {url: 'assets/menu/womanButtonDown.png'},
        {url: 'assets/game/anteCircle.png'},
        {url: 'assets/game/chip.png'},
        {url: 'assets/game/hitButton.png'},
        {url: 'assets/game/hitButtonDown.png'},
        {url: 'assets/game/logo.png'},
        {url: 'assets/game/sideArrow.png'},
        {url: 'assets/game/standButton.png'},
        {url: 'assets/card/clubs.png'},
        {url: 'assets/card/diamonds.png'},
        {url: 'assets/card/hearts.png'},
        {url: 'assets/card/spades.png'},
        {url: 'assets/card/deck.png'},
        {url: 'assets/card/faceUpBackground.png'},
        {url: 'assets/card/faceDownBackground.png'},
        {url: 'assets/game/animation/chair.png'}
    ];

    if(blackjack.ORIENTATION === blackjack.LANDSCAPE) {
        this.images = imagesLandscape;
    }
    else {
        this.images = imagesPortait;
    }

    for(var i=0; i<gameImgages.length;i+=1) {
        var img = gameImgages[i];
        this.images.push(img);
    }
    this.loadImage();
};

blackjack.Preload.prototype.loadImage = function() {
    var imageLoader = new goog.net.ImageLoader(),
        images = this.images,
        image;

    this.totalToLoad = this.images.length;
    this.totalLoaded = 0;
    this.titleLabel.setText('LOADING ' + (Math.round((this.totalLoaded / this.totalToLoad) * 100)).toString() + '%');

    goog.events.listen(imageLoader, goog.net.EventType.COMPLETE, function(e) {
        this.complete();
    }, false, this);

    goog.events.listen(imageLoader, 'load', function(e) {
        this.totalLoaded += 1;
        this.titleLabel.setText('LOADING ' + (Math.round((this.totalLoaded / this.totalToLoad) * 100)).toString() + '%');
    }, false, this);

    for(var i=0; i<images.length; i+=1) {
        image = images[i];
        imageLoader.addImage(i, image.url);
    }
    imageLoader.start();
}

blackjack.Preload.prototype.complete = function() {
    lime.scheduleManager.callAfter(function(dt){
        this.dispatchEvent('complete');
    }, this, 1500);
}





