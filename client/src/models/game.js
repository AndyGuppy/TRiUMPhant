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
  },

  calculateWinner: function(playerValue, computerValue, characteristic){
    switch (characteristic){

      case "characteristic1":
        if (playerValue > computerValue) {
          return "player wins";
          break;
        }else if (playerValue === computerValue) {
          return'draw';
          break;
        }else {
          return "computer wins";
          break;
        }
      ;
      case characteristic2: 
      if (playerValue < computerValue) {
        console.log("player wins");
        break;
      }else if (playerValue === computerValue) {
        console.log("draw");
        break;
      }else {
        console.log ("computerwins");
        break;
      }
      ;

      case characteristic3: 
      ;
      case characteristic4: 
      ;
      } 

    },   


  //   if (playerChoice === card.characteristic1){

  //   } else{

  //   }

  //   else if 

  // },

  checkGameWon: function(){

  }
}




module.exports = Game;