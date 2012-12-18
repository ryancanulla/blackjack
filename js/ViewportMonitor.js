goog.provide('blackjack.utils.ViewportMonitor');

goog.require('lime.Scene');

blackjack.utils.ViewportMonitor = function(){
    lime.Scene.call(this);

    this.portrait = 'portrait';
    this.landscape = 'landscape';

    this.defaultOrientation = this.portrait;
    this.isRotated = false;


    this.setup();
};
goog.inherits(blackjack.utils.ViewportMonitor, lime.Scene);

blackjack.utils.ViewportMonitor.prototype.setup = function(){
    var vsm = new goog.dom.ViewportSizeMonitor(),
        self = this;
    goog.events.listen(vsm, goog.events.EventType.RESIZE, function(event){
        self.resize(event);
    });
};

blackjack.utils.ViewportMonitor.prototype.resize = function(event){
    var width = event.target.getSize().width,
        height = event.target.getSize().height,
        orientation;

    orientation = this.getOrientation(width, height)
    this.checkForRotation(orientation);
};

blackjack.utils.ViewportMonitor.prototype.getOrientation = function(width, height){
    if(height > width) {
        return 'portrait';
    }
    else {
        return 'landscape';
    }
};

blackjack.utils.ViewportMonitor.prototype.checkForRotation = function(orientation){
    if(orientation !== this.defaultOrientation && goog.userAgent.MOBILE) {
        this.isRotated = true;
    }
    else {
        this.isRotated = false;
    }
    this.onDeviceRotated();
};

blackjack.utils.ViewportMonitor.prototype.onDeviceRotated = function(){

};

