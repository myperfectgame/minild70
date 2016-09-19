"use strict";

var static_id = 0;

$.Player = function(keeper, star) {
    this.id = static_id++;
    this.color = 'rgba(3, 3, 3, 1)';
    var extra = 0;
    if (star) {
        extra = 2;
    }
    if(keeper) {
        this.keeper = $.util.randomIntInRange(6,9+extra);
        this.defence = $.util.randomIntInRange(0,5);
        this.midfield = $.util.randomIntInRange(0,2);
        this.attack = $.util.randomIntInRange(0,2);
    }
    else {
        this.keeper =  $.util.randomIntInRange(0,2);
        this.defence = $.util.randomIntInRange(0,7);
        this.midfield = $.util.randomIntInRange(0,7);
        this.attack = $.util.randomIntInRange(0,7);
        if (star) {
            if (this.defence > this.midfield && this.defence > this.attack) {
                this.defence = $.util.randomIntInRange(6,9) + extra;
            }
            else if (this.midfield > this.defence && this.midfield > this.attack) {
                this.midfield = $.util.randomIntInRange(6,9) + extra;
            }
            else {
                this.attack = $.util.randomIntInRange(6,9) + extra;
            }
        }
    }
};


$.Player.prototype.render = function (x, y) {

    $.Draw.fillText("Keeper: " + this.keeper + "\nDefence: " + this.defence + "\nMidfield: " + this.midfield + 
        "\nAttack: " + this.attack, x, y, "30px Arial");
    

};


$.Player.prototype.update = function () {

};

