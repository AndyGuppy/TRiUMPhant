var Card = require('./card');
var shuffle = require('shuffle-array');

var Deck = function(){
  this.cards = [];
}

Deck.prototype = {

  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  all: function(callback){
    this.makeRequest('http://localhost:3000/cards', function(){
      if (this.status !== 200) return;
        var jsonString = this.responseText 
        
        var result = JSON.parse(jsonString);
        console.log('this inside', result)
        callback(result);
    }); //
  },

  getCards: function(dbResults){
    for (var object of dbResults){
      var newCard = new Card(object);
      this.cards.push(newCard);
    };
  },

  

  shuffleCards: function(){
    shuffle(this.cards)
  }
}


module.exports = Deck;