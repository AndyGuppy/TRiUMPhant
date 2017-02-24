var Deck = require('../deck');
var Card = require('../card');

var assert = require('assert');

describe('Deck', function() {
  var deck;

  beforeEach(function() {
    deck = new Deck();
  });

  it('should start empty', function() {
    assert.equal(0, this.deck.size());
  });
});