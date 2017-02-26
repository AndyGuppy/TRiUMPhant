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


<<<<<<< HEAD
  render: function(xxxxx) {

  },

=======
>>>>>>> develop
  tempclick: function() {
    console.log("game in tempclick", game)
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
    game.selected = "temp";

<<<<<<< HEAD
=======
    
  // needs to pass 'temp' for calculateWinner to work
>>>>>>> develop
  },

  windclick: function() {
    console.log("wind captured")
    var pWind = document.getElementById('play-wind');
    pWind.style.backgroundColor = "green";
   
   },

  playButtonClick: function(){
<<<<<<< HEAD
    console.log('play button is clicked')
    game.calculateWinner(game.selected);  // feed in temp/wind
=======
    console.log('button clicked --' + game.selected)
    console.log(game.calculateWinner(game.selected))

>>>>>>> develop

  }

}
  

module.exports = UI;
