var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

var UI = function() {

game = new Game()

  var playTemp = document.getElementById("play-temp");
  playTemp.addEventListener("click", this.tempClick, game);

  var playWind = document.getElementById("play-wind");
  playWind.addEventListener("click", this.windClick, game);

  var playHumidity = document.getElementById("play-humidity");
  playHumidity.addEventListener("click", this.humidityClick, game);
  
  var playDaylight = document.getElementById("play-daylight");
  playDaylight.addEventListener("click", this.daylightClick, game);

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

  tempClick: function() {
    var pTemp = document.getElementById('play-temp');
    game.resetColour();
    pTemp.style.backgroundColor = "green";
    game.selected = "temp";
  },

  windClick: function() {
    var pWind = document.getElementById('play-wind');
    game.resetColour();
    pWind.style.backgroundColor = "green";
    game.selected = "wind";
   },

   humidityClick: function() {
     var pHumidity = document.getElementById('play-humidity');
     game.resetColour();
     pHumidity.style.backgroundColor = "green";
     game.selected = "humidity";
   },

   daylightClick: function() {
     var pDaylight = document.getElementById('play-daylight');
     game.resetColour();
     pDaylight.style.backgroundColor = "green";
     game.selected = "daylight";
   },


  playButtonClick: function(){

    console.log('button clicked --' + game.selected)
    game.calculateWinner(game.selected)
    game.selected = "";

  }

}
  

module.exports = UI;
