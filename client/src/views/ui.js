var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

var selected;

var UI = function() {

  var deck = new Deck();
  
 


  deck.all(function(result){
    
    var game = new Game();
    deck.getCards(result)
    deck.shuffleCards();
    console.log('game',game);
    game.dealCards(deck.cards);
    game.displayWeatherInfo(game.playerHand, "player");
    game.displayWeatherInfo(game.computerHand, "computer");


  }.bind(this));

  var playTemp = document.getElementById("play-temp");
  playTemp.addEventListener("click", this.tempclick);
  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", this.playButtonClick);



  // get numbers from api
  // populate template with numbers 


  
    

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
    console.log("temp captured")
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
    
  // needs to pass 'temp' for calculateWinner to work
  },

  windclick: function() {
    console.log("wind captured")
    var pWind = document.getElementById('play-wind');
    pWind.style.backgroundColor = "green";
    // needs to pass 'wind' for calculateWinner to work
   },

  playButtonClick: function(){
    game.calculateWinner(selected);  // feed in temp/wind 
    console.log('we are here')

  }

}
  

module.exports = UI;
