"use strict";

var $ = {};

$.width = 800;
$.height = 500;

$.playerNames = {
    0:"John Bender", 
    1:"Lars Bensen",
    2:"Frank Larsen", 
    3:"Viggo Johnson",
    4:"Petter Solberg", 
    5:"Terje Bakken",
    6:"Karl Knasen", 
    7:"Jens Bekken",
    8:"Per Storberg", 
    9:"Freddy Larsson",
    10:"Gunnar Olsen", 
    11:"Patrick Berget",
    12:"Odd Martin Lange", 
    13:"Frode Johansen",
    14:"Aage Andersen", 
    15:"David Abrahamsen",
    16:"Alex Linsen", 
    17:"Adam Egersen",
    18:"Guttorm Igersen", 
    19:"Alf Egilsen",
    20:"Steinar Hansen", 
    21:"Agnar Berg",
    22:"Jostein Hagen", 
    23:"Aksel Kolle",
    24:"Albert Karlsen", 
    25:"Jan Pedersen",
    26:"Joakim Smith", 
    27:"Jarle Nilsen",
    28:"Johannes Kristiansen", 
    29:"Inge Jensen",
    30:"Ingolf Halvorsen",
    31: "Robert Karus"
};

$.teamNames = {
    0:"Woolwich Gunners",
    1:"AC Inter", 
    2:"Tigers FC",
    3:"Athletico Real",
    4:"Bargelona FC",
    5:"London Inc.", 
    6:"Celtic Rangers",
    7:"Sherwood Forest"
};

$.colors = {
    black: 'rgba(0, 0, 0, 1)',
    gray: 'rgba(157, 157, 157, 1)',
    white: 'rgba(255, 255, 255, 1)',
    red: 'rgba(190, 38, 51, 1)',
    pink: 'rgba(295, 99, 247, 1)',
    purple: 'rgba(91, 0, 110, 1)',
    darkbrown: 'rgba(73, 60, 43, 1)',
    brown: 'rgba(164, 100, 34, 1)',
    yellow: 'rgba(247, 226, 107, 1)',
    darkgreen: 'rgba(47, 72, 78, 1)',
    green: 'rgba(88, 167, 46, 1)',
    slimegreen: 'rgba(163, 206, 39, 1)',
    nightblue: 'rgba(27, 38, 50, 1)',
    seablue: 'rgba(0, 87, 132, 1)',
    skyblue: 'rgba(49, 162, 242, 1)',
    cloudblue: 'rgba(178, 220, 239, 1)',

};

$.red = 'rgba(190, 38, 51, 1)';
$.black = 'rgba(0, 0, 0, 1)';
$.gray ='rgba(157, 157, 157, 1)';

$.timer = 0;

$.timeout = 100;

$.entities = [];

$.stop = false;
$.current_player = 0;

var dt = 0;
var controls = { left: false, right: false, jump: false };

$.init = function () {
    /*
    $.canvas = document.getElementsByTagName('canvas')[0];
    $.canvas.width = $.width;
    $.canvas.height = $.height;
    $.ctx = $.canvas.getContext('2d');
*/
    $.players = [];
    
    $.generateRandomObjects();
  
    $.renderMatches = false;
    $.loop();
};

$.sloop = function () {
    $.render();
    $.update();

//    window.requestAnimFrame($.loop);
    $.loop();
};

$.loop = function () {

    var FPS = 30;
    setInterval(function() {
      $.render();
      $.update();
      //draw();
    }, 1000/FPS);
};
$.generateRandomObjects = function () {
    $.entities = [];
    $.team1 = $.generateTeam1();
    $.team2 = $.generateTeam2();
    $.team3 = $.generateTeam3();
    $.team4 = $.generateTeam4();
    $.team5 = $.generateTeam5();
    $.team6 = $.generateTeam6();
    $.team7 = $.generateTeam7();
    $.team8 = $.generateTeam8();
    
    $.team1.setMy(false);
    $.team2.setMy(false);
    $.team3.setMy(false);
    $.team4.setMy(false);
    $.team5.setMy(false);
    $.team6.setMy(false);
    $.team7.setMy(false);

    $.events = new $.Event();
    $.events.addEvent("test");
    $.match = new $.Match($.team1, $.team2, false);
/*
    $.table = new $.Table(6);
    $.table.addTeam($.team1);
    $.table.addTeam($.team2);
    $.table.addTeam($.team3);
    $.table.addTeam($.team4);
    $.table.addTeam($.team5);
    $.table.addTeam($.team6);
    $.table.addTeam($.team7);
    $.table.addTeam($.team8);
    $.table.updateTable();
*/
    $.season = new $.Season(8);
    $.season.addTeam($.team1);
    $.season.addTeam($.team2);
    $.season.addTeam($.team3);
    $.season.addTeam($.team4);
    $.season.addTeam($.team5);
    $.season.addTeam($.team6);
    $.season.addTeam($.team7);
    $.season.addTeam($.team8);
    $.season.generateMatches();
    
    $.team8.render();

    $.addPlayNextMatchButton();
    $.addPlaySeasonButton();

  //  $.table.updateTable();
  $.season.render();
};

$.addPlaySeasonButton = function() {

    var buffer = '<button onclick="$.playSeason()">Play season</button>';

    document.getElementById('playSeasonButton').innerHTML = buffer;    

};

$.addPlayNextMatchButton = function() {

    var buffer = '<button onclick="$.playNextMatchday()">Play next match</button>';

    document.getElementById('playNextMatchButton').innerHTML = buffer;    

};

$.playNextMatchday = function() {
    $.season.simNextMatchday();

};

$.playSeason = function() {
    $.season.simSeason();
};

$.generateRandomTeam2 = function() {

    var team = new $.Team();

    if (0 === $.util.randomIntInRange(0,6)) {
        $.players.push(new $.Player(true, true));
        $.players.push(new $.Player(false, false));
        team.addPlayer($.players[$.current_player]);
        team.setKeeper($.players[$.current_player++]);

        team.addPlayer($.players[$.current_player]);
        team.setDefender($.players[$.current_player++]);
    }
    else {
        $.players.push(new $.Player(true, false));
        $.players.push(new $.Player(false, true));
        team.addPlayer($.players[$.current_player]);
        team.setKeeper($.players[$.current_player++]);

        team.addPlayer($.players[$.current_player]);
        team.setDefender($.players[$.current_player++]);
    }
    for (var i=0; i<4; i++) {
        
        $.players.push(new $.Player(false, false));
    }
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam1 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 0, "Fast runner", 1200));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 2, 10, 2, "Freekick expert", 1200));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 3, "Amazing dribbler", 1200));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 3, 10, "Amazing dribbler", 1200));
    team.addPlayer($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 4, 5, 4, "Fast runner", 700));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;

};

$.generateTeam2 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 10, 0, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 2, 10, 2, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 3, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 1, "Freekick expert", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 4, 5, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam3 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 10, 1, "Freekick expert", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 2, 10, 2, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 10, "Amazing dribbler", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 10, "Amazing dribbler", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 4, 5, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam4 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 0, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 10, 1, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 10, 2, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 10, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 10, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 29, 1, 4, 4, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam5 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 1, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 3, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 29, 1, 4, 4, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam6 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 1, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 1, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 3, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 29, 1, 4, 4, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam7 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 1, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 1, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 3, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 29, 1, 4, 4, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam7 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 1, 1, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 2, 10, 2, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 2, "Amazing dribbler", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 3, 10, 7, "Freekick expert", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 29, 1, 4, 4, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam8 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerNames[$.current_player], 28, 10, 1, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 2, 0, "Excellent header", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 2, "Amazing dribbler", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 10, 0, 3, "Freekick expert", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 1, 10, 0, "Amazing dribbler", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerNames[$.current_player], 27, 1, 4, 5, 4, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.update = function () {
    if ($.stop) return;

    $.timer++;
    if ($.timeout > 0) {
        $.timeout--;
    }
    else {
        if (controls.left) {
            if ($.current_player != 0) {
                $.current_player--;
                $.team1.removePlayer($.players[$.current_player]);
                $.timeout = 50;
            }
        }
        else if (controls.right) {
            if ($.current_player < $.players.length) {
                $.team1.addPlayer($.players[$.current_player]);
                $.current_player++;
                $.timeout = 50;
            }
        }
        else if (controls.up) {
            if ($.current_player < $.players.length) {
                $.team1.unsetPlayer($.players[$.current_player-1]);
                $.team1.setMidfielder($.players[$.current_player-1]);
                $.timeout = 50;
            }
        }
    }
    if ($.renderMatches) {
        $.match.update($.timer);
    }
    else {
        //$.match.fastSim();
    }

    $.events.update();
};

$.render = function () {
   // $.Draw.clear();

    for (var i=0; i<$.players.length; i++) {
  //      $.players[i].render(30, 50 + 30* i);
    }
    if ($.renderMatches) {
        //$.team1.render(5, 450);
        //$.team2.render(5, 500);
        $.match.render(5, 370);
        //$.events.render();
       // $.season.render();
    }
    else {/*
        $.team1.render(5, 450);
        $.team2.render(5, 500);
        $.team3.render(5, 150);
        $.team4.render(5, 200);
        */
        $.match.render(5, 370);        
        ///$.table.render();
      //  $.season.render();
    }
};

window.addEventListener('load', $.init, false);

window.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, true);
window.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function onkey(ev, key, down) {
    var KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, X: 88 };

  switch(key) {
    case KEY.LEFT:  controls.left  = down; return false;
    case KEY.RIGHT: controls.right = down;  return false;
    case KEY.UP: controls.up  = down; return false;
    case KEY.DOWN: controls.down  = down; return false;
    case KEY.SPACE: controls.space = down; return false;
    case KEY.X: controls.x = down; return false;
  }
}