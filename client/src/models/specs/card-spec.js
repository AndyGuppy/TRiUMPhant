var Card = require('../card');
var assert = require('assert');

describe('Card', function() {
  var card;

  beforeEach(function() {
    card = new Card({
      name: "Paris",
      imagepth: "image/is/here.jpg",
      skycode: 'PRS'
    });
  });

  it('should have name', function() {
    assert.equal('Paris', card.name);
  });

  it('should have an imagepth', function() {
    assert.equal('image/is/here.jpg', card.imagepth);
  });

  it('should have a skycode', function() {
    assert.equal('PRS', card.skycode);
  });
});