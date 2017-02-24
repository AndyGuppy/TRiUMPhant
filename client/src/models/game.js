var Card = require('./card');
var Deck = require('./deck');

var Game = function(){
  this.playerHand = []
  this.computerHand = []
}

Game.prototype = {

  dealCards: function(Deck){
    for (var i = 0; i < Deck.deck.length/2; i++){
      this.playerHand.push(Deck.deck[i])
    };
    for (var i = Deck.deck.length/2; i < Deck.deck.length; i++){
      this.computerHand.push(Deck.deck[i])
    };
  }
}




module.exports = Game;