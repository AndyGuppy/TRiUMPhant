var Game = require('../game');

var assert = require('assert');

describe('Game', function() {
  var game1;

  beforeEach(function() {
    game1 = new Game();
  });

  it('should start with empty playerHand', function() {
    assert.equal(0, game1.playerHand.length)
  });

  it('should start with empty computerHand', function() {
    assert.equal(0, game1.computerHand.length)
  });

})