var Deck = require('../models/deck');
var Game = require('../models/game');

var UI = function() {

  var deck = new Deck();
 


  deck.all(function(result){
    var game = new Game();
    deck.getCards(result)
    deck.shuffleCards();

    game.dealCards(deck.cards);
    game.displayWeatherInfo(game.playerHand, "player");
    game.displayWeatherInfo(game.computerHand, "computer");

  }.bind(this));


  // get numbers from api
  // populate template with numbers 


  var playTemp = document.getElementById("play-temp");
  
  //playTemp.addEventListener("click", this.tempclick);
    

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
    console.log("captured")
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
 }
}
  

module.exports = UI;
