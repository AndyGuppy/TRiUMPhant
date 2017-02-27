var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

var gameUI = function() {

  var cardHeader = document.getElementById("player-city-header");
  var playerCityName = document.createElement('h3');
  playerCityName.innerText = this.playerHand[0].name;
  cardHeader.appendChild(playerCityName);

  var cardHeader = document.querySelector(".player-city-image");
  var photo = document.createElement("IMG");
  console.log(this.playerHand[0].imagepth)
  photo.setAttribute("src", this.playerHand[0].imagepth);
  photo.setAttribute("width", "80%");
  photo.setAttribute("alt", "Picture of City");
  cardHeader.appendChild(photo);

  
  //computer display
  var cardHeader = document.getElementById("computer-city-header");
  var computerCityName = document.createElement('h3');
  computerCityName.innerText = this.computerHand[0].name;
  cardHeader.appendChild(computerCityName); 

  var cardHeader = document.querySelector(".computer-city-image");
  var photo = document.createElement("IMG");
  photo.setAttribute("src", this.computerHand[0].imagepth);
  photo.setAttribute("width", "80%");
  photo.setAttribute("alt", "Picture of City");
  cardHeader.appendChild(photo);

  }


  gameUI.prototype = {

    createText: function(text, label) {
      var p = document.createElement('p');
      p.innerHTML = label + text;
      return p;
    },

    appendText: function(element, text, label) {
      var pTag = this.createText(text, label);
      element.appendChild(pTag);
    },

    tempClick: function() {
      var pTemp = document.getElementById('play-temp');
      game.resetColour();
      pTemp.style.backgroundColor = "green";
      game.selected = "temp";
    },

    windClick: function() {
      var pWind = document.getElementById('play-wind');
      game.resetColour();
      pWind.style.backgroundColor = "green";
      game.selected = "wind";
     },

     humidityClick: function() {
       var pHumidity = document.getElementById('play-humidity');
       game.resetColour();
       pHumidity.style.backgroundColor = "green";
       game.selected = "humidity";
     },

     daylightClick: function() {
       var pDaylight = document.getElementById('play-daylight');
       game.resetColour();
       pDaylight.style.backgroundColor = "green";
       game.selected = "daylight";
     },


    playButtonClick: function(){

      console.log('button clicked --' + game.selected)
      game.calculateWinner(game.selected)
      game.selected = "";

    }

  }
    

  module.exports = gameUI;