var Game = require('../game');
var Deck = require('../deck');

var assert = require('assert');

describe('Game', function() {
  var game1;
  var deckA;

  beforeEach(function() {
    game1 = new Game();
    deckA = new Deck();
    cards = [{name: 1}, {name: 1}, {name: 1}, {name: 1}, {name: 1}, {name: 1}]

  });

  it('should start with empty playerHand', function() {
    assert.equal(0, game1.playerHand.length)
  });

  it('should start with empty computerHand', function() {
    assert.equal(0, game1.computerHand.length)
  });

  it('should add cards to computerHand', function() {
    deckA.getCards(cards)
    game1.dealCards(deckA)
    assert.equal(3, game1.computerHand.length)
  });

  it('should add cards to playerHand', function() {
    deckA.getCards(cards)
    game1.dealCards(deckA)
    assert.equal(3, game1.playerHand.length)
  });

  it('can let player win', function(){
    
    assert.equal("player wins", game1.calculateWinner(2,1,"characteristic1"))
  });

  it('can let computer win', function(){
    
    assert.equal("computer wins", game1.calculateWinner(1,2,"characteristic1"))
  });

  it('should be a draw', function(){
    assert.equal("draw", game1.calculateWinner(1,1,"characteristic1"))
  });

})