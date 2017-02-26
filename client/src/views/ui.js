var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

var UI = function() {

  var game = new Game();

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


  render: function(xxxxx) {

  },

  tempclick: function() {
    console.log("game in tempclick", game)
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
    game.selected = "temp";

  },

  windclick: function() {
    console.log("wind captured")
    var pWind = document.getElementById('play-wind');
    pWind.style.backgroundColor = "green";
   
   },

  playButtonClick: function(){
    console.log('play button is clicked')
    game.calculateWinner(game.selected);  // feed in temp/wind

  }

}
  

module.exports = UI;
