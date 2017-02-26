var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

// var selected;

var UI = function() {

game = new Game()
  var playTemp = document.getElementById("play-temp");
  playTemp.addEventListener("click", this.tempclick, game);
  
  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", this.playButtonClick, game);


}

UI.prototype = {


  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerHTML = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },


  tempclick: function() {
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
    game.selected = "temp";

    
  // needs to pass 'temp' for calculateWinner to work
  },

  windclick: function() {
    console.log("wind captured")
    var pWind = document.getElementById('play-wind');
    pWind.style.backgroundColor = "green";
    // needs to pass 'wind' for calculateWinner to work
   },

  playButtonClick: function(){
    console.log('button clicked --' + game.selected)
    game.calculateWinner(game.selected);
    game.selected = "";

  }

}
  

module.exports = UI;
