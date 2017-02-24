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

})