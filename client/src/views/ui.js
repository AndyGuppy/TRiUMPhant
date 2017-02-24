var Deck = require('../models/deck');

var UI = function() {
  var deck = new Deck();

  deck.getCards(CardQuery.all)





  // var xxxxx = new Xxxxx();
  // xxxxx.all(function(result){
  //   this.render(result);
  // }.bind(this));
}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerHTML = label + text;
    console.log(p);
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },



  render: function(xxxxx) {

    }
  }
}

module.exports = UI;
