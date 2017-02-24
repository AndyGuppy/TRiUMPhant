var Card = require('./card');

var Deck = function(options){
  this.deck = [];
}

Deck.prototype = {
  getCards: function(dbResults){
    for (object of dbResults){
      var newCard = new Card(object);
      this.deck.push(newCard);
    }
  }
}


module.exports = Deck;