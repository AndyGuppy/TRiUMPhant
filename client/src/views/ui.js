var Deck = require('../models/deck');

var UI = function() {
  var deck = new Deck();

  deck.getCards(CardQuery.all)
  


  var playTemp = document.getElementById("play-temp");
  console.log(playTemp);
  playTemp.addEventListener("click", this.tempclick);

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

    },

  tempclick: function() {
    console.log("captured")
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
 }
}
  

module.exports = UI;
