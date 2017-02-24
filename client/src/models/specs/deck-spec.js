var Deck = require('../deck');
var Card = require('../card');

var assert = require('assert');

describe('Deck', function() {
  var deck1;
  var cards;

  beforeEach(function() {
    deck1 = new Deck();
    cards = [{
      name: "Paris",
      imagepth: "image/is/here.jpg",
      skycode: 'PRS'
    }, 
    {
      name: "Dublin",
      imagepth: "image/is/here2.jpg",
      skycode: 'DBN'
    }]
  });

  it('should start empty', function() {
    assert.equal(0, deck1.deck.length)
  });

  it('should be able to get cards', function(){
    deck1.getCards(cards)
    assert.equal(2, deck1.deck.length)
  })
});