goog.provide('blackjack.Inventory');

blackjack.Inventory = function(total){
    lime.Sprite.call(this);

    this.total = total;
    this.createChildren();
};
goog.inherits(blackjack.Inventory, lime.Sprite);

blackjack.Inventory.prototype.createChildren = function(){
    var turnsLabel = new lime.Label(),
        anti = new lime.Sprite();

    this.chips = [];

    turnsLabel.setFontSize(40);
    turnsLabel.setFontColor('#ffffff');
    turnsLabel.setAnchorPoint(1,0)
    turnsLabel.setFontFamily('Arial');
    turnsLabel.setFontWeight('bold');
    turnsLabel.setPosition(0, 0);
    turnsLabel.setText('TURNS');


    anti.setAnchorPoint(.5,.5);
    anti.setFill('assets/game/anteCircle.png');

    if(blackjack.ORIENTATION == blackjack.LANDSCAPE) {
        anti.setPosition(160, -175);
    }
    else {
        anti.setPosition(500, -175);
    }


    this.anti = anti;
    this.appendChild(turnsLabel);
    this.appendChild(anti);
    this.drawChips();
};


blackjack.Inventory.prototype.drawChips = function(){
    var chip,
        length = this.total,
        xPos = 25;

    for(var i=0; i < length; i+=1) {
        xPos += 25;
        chip = new lime.Sprite();
        chip.setFill('assets/game/chip.png');
        chip.setPosition(xPos, 20);

        this.appendChild(chip);
        this.chips.push(chip);
    }
};

blackjack.Inventory.prototype.removeChip = function(){
    var chip,
        index = this.chips.length - 1;

    chip = this.chips[index];
    if(chip) {
        this.removeChild(chip);
        this.chips.pop();
    }
};

blackjack.Inventory.prototype.antiUp = function(){
    var chip,
        index = this.chips.length - 1,
        move,
        anti = this.anti.getPosition();

    chip = this.chips[index];
    if(chip) {
        move = new lime.animation.MoveTo(anti.x, anti.y).setDuration(.5).setEasing(lime.animation.Easing.EASEOUT);
        chip.runAction(move);
    }
};
