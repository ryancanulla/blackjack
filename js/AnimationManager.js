goog.provide('blackjack.AnimationManager');

goog.require('blackjack.AnimationList');
goog.require('goog.net.ImageLoader');
goog.require('goog.events.EventType');
goog.require('goog.net.XhrIo');
goog.require('lime.Scene');

blackjack.AnimationsManager = function(gender){
    var self = this,
        url='';

    if(blackjack.ORIENTATION === blackjack.LANDSCAPE) {
        url = 'assets/game/animation/animationConfig.json'
    }
    else {
        url = 'assets/game/animation/animationConfigMobile.json'
    }

    goog.net.XhrIo.send(url, function(e) {
        var xhr = e.target;
        var obj = xhr.getResponseJson();
        self.animationList = obj;
    });

    this.currentLevel = 0;
    this.loadedLevels = 0;
};

goog.inherits(blackjack.AnimationsManager, lime.Scene);


blackjack.AnimationsManager.prototype.manWin = function(){
    var list = this.animationList.man.lose,
        length = list.length,
        index = Math.round((length - 1) * Math.random()),
        animation = list.splice(index, 1);


    if(!animation) {
        return 'null';
    }

    return animation[0];
};

blackjack.AnimationsManager.prototype.womanLosesItem = function(level){
    return this.getAnimation(this.animationList.woman.win, level);
};

blackjack.AnimationsManager.prototype.manLosesItem = function(level){
    return this.getAnimation(this.animationList.man.win, level);
};

blackjack.AnimationsManager.prototype.womanTauntsUser = function(level){
    if(this.animationList) {
        return this.getAnimation(this.animationList.woman.lose, level);
    }
    else {

    }
};

blackjack.AnimationsManager.prototype.manTauntsUser = function(level){
    return this.getAnimation(this.animationList.man.lose, level);
};

blackjack.AnimationsManager.prototype.playedTaunt = function(animation, gender){
    var item,
        list;

    if(gender === blackjack.MAN) {
        list = this.animationList.man.lose;
    }
    else {
        list = this.animationList.woman.lose;
    }

    for(var i=0;i<list.length;i+=1) {
        item = list[i];

        if(animation === item){
            list.splice(i,1);
            return true;
        }
    }
    return false;
};

blackjack.AnimationsManager.prototype.getAnimation = function(list, level){
    var item,
        animation;


    for(var i=0;i<list.length;i+=1) {
        item = list[i];

        if(item.level === level){
//            animation = list.splice(i,1)[0];
            animation = list[i];
            animation.targetScale = this.animationList.targetScale;
            return animation;
        }
    }

    if(!animation) {
        return {time:1000};
    }

    return animation;
};

blackjack.AnimationsManager.prototype.hasTauntForLevel = function(level, gender){
    var list,
        item,
        hasAnimation=false;

    if(gender === blackjack.MAN) {
        list = this.animationList.man.lose;
    }
    else {
        list = this.animationList.woman.lose;
    }


    for(var i=0;i<list.length;i+=1) {
        item = list[i];

        if(item.level === level){
            hasAnimation = true
        }
    }
    return hasAnimation;
};


blackjack.AnimationsManager.prototype.loadManImages = function(){
    lime.scheduleManager.callAfter(function(dt){
        this.loadImages(this.animationList.man.win, 1);
        this.loadImages(this.animationList.man.lose, 1);
        this.loadImages(this.animationList.man.win, 2);
        this.loadImages(this.animationList.man.lose, 2);
        this.loadedLevels +=2;
    }, this, 5000);
};

blackjack.AnimationsManager.prototype.loadWomanImages = function(){
    lime.scheduleManager.callAfter(function(dt){
        this.loadImages(this.animationList.woman.win, 1);
        this.loadImages(this.animationList.woman.lose, 1);
        this.loadImages(this.animationList.woman.win, 2);
        this.loadImages(this.animationList.woman.lose, 2);
        this.loadedLevels +=2;
    }, this, 5000);
};

blackjack.AnimationsManager.prototype.loadImages = function(images, level) {
    var imageLoader = new goog.net.ImageLoader(),
        image,
        loadIndex = 0;

    goog.events.listen(imageLoader, goog.net.EventType.COMPLETE, function(e) {

    }, false, this);

    goog.events.listen(imageLoader, 'load', function(e) {
        loadIndex +=1;
    }, false, this);

    for(var i=0; i<images.length; i+=1) {
        image = images[i];
        if(image.level === level) {
            imageLoader.addImage(i, image.url);
        }
    }
    imageLoader.start();
};

blackjack.AnimationsManager.prototype.testAllAssetURLs = function() {
    this.loadImages(this.animationList.man.win, 1);
    this.loadImages(this.animationList.man.win, 2);
    this.loadImages(this.animationList.man.win, 3);
    this.loadImages(this.animationList.man.win, 4);
    this.loadImages(this.animationList.man.win, 5);
    this.loadImages(this.animationList.man.win, 6);
    this.loadImages(this.animationList.man.win, 7);
    this.loadImages(this.animationList.man.win, 8);
    this.loadImages(this.animationList.man.win, 9);
    this.loadImages(this.animationList.man.win, 10);

    this.loadImages(this.animationList.man.lose, 1);
    this.loadImages(this.animationList.man.lose, 2);
    this.loadImages(this.animationList.man.lose, 3);
    this.loadImages(this.animationList.man.lose, 4);
    this.loadImages(this.animationList.man.lose, 5);
    this.loadImages(this.animationList.man.lose, 6);
    this.loadImages(this.animationList.man.lose, 7);
    this.loadImages(this.animationList.man.lose, 8);
    this.loadImages(this.animationList.man.lose, 9);
    this.loadImages(this.animationList.man.lose, 10);

    this.loadImages(this.animationList.woman.win, 1);
    this.loadImages(this.animationList.woman.win, 2);
    this.loadImages(this.animationList.woman.win, 3);
    this.loadImages(this.animationList.woman.win, 4);
    this.loadImages(this.animationList.woman.win, 5);
    this.loadImages(this.animationList.woman.win, 6);
    this.loadImages(this.animationList.woman.win, 7);
    this.loadImages(this.animationList.woman.win, 8);
    this.loadImages(this.animationList.woman.win, 9);
    this.loadImages(this.animationList.woman.win, 10);

    this.loadImages(this.animationList.woman.lose, 1);
    this.loadImages(this.animationList.woman.lose, 2);
    this.loadImages(this.animationList.woman.lose, 3);
    this.loadImages(this.animationList.woman.lose, 4);
    this.loadImages(this.animationList.woman.lose, 5);
    this.loadImages(this.animationList.woman.lose, 6);
    this.loadImages(this.animationList.woman.lose, 7);
    this.loadImages(this.animationList.woman.lose, 8);
    this.loadImages(this.animationList.woman.lose, 9);
    this.loadImages(this.animationList.woman.lose, 10);
}




