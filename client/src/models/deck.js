var Card = require('./card');
var shuffle = require('shuffle-array');

var Deck = function(options){
  this.deck = [];
}

Deck.prototype = {
  getCards: function(dbResults){
    for (object of dbResults){
      var newCard = new Card(object);
      this.deck.push(newCard);
    }
  },

  shuffleCards: function(){
    shuffle(this.deck)
  }
}


module.exports = Deck;