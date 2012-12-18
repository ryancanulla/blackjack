goog.provide('blackjack.Button');

goog.require('lime.GlossyButton');

blackjack.Button = function(upBackground, downBackground) {
    lime.Button.call(this, this.makeState_(upBackground), this.makeState_(downBackground));
};
goog.inherits(blackjack.Button, lime.Button);

blackjack.Button.prototype.setText = function(txt) {
    this.upstate.label.setText(txt);
    this.downstate.label.setText(txt);
    return this;
};

blackjack.Button.prototype.makeState_ = function(background) {
    var state = new lime.Sprite();
    state.setFill(background);
    return state;
};
