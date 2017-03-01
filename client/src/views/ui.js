var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

var UI = function() {

  game = new Game()

  // this.showButtonClick(game);

  var playTemp = document.getElementById("play-temp");
  playTemp.addEventListener("click", this.tempClick, game);

  var playWind = document.getElementById("play-wind");
  playWind.addEventListener("click", this.windClick, game);

  var playHumidity = document.getElementById("play-humidity");
  playHumidity.addEventListener("click", this.humidityClick, game);
  
  var playDaylight = document.getElementById("play-daylight");
  playDaylight.addEventListener("click", this.daylightClick, game);

  var playFlight = document.getElementById("play-flight");
  playFlight.addEventListener("click", this.flightClick, game);

  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", this.playButtonClick, game);

  var startButton = document.getElementById("start-button");
  startButton.addEventListener("click", this.startButtonClick, game);

}

UI.prototype = {

  divClick: function(divId,selected){
    var divId = document.getElementById(divId);
    UI.prototype.resetColour();
    divId.style.backgroundColor = "#5F9EA0";
    game.selected = selected;
  },

  tempClick: function() {
    UI.prototype.divClick('play-temp',"temp")
  },

  windClick: function() {
    UI.prototype.divClick('play-wind',"wind")
  },

  humidityClick: function() {
    UI.prototype.divClick('play-humidity',"humidity")
  },

  daylightClick: function() {
    UI.prototype.divClick('play-daylight',"daylight")
  },

  flightClick: function() {
    UI.prototype.divClick('play-flight',"flight")
  },

  playButtonClick: function(){
    var nextButton = document.getElementById('play-button');
    var ccard = document.querySelector(".ccard");
    
    var winner = "";
    if (nextButton.innerText !== "New Game"){
      switch (gamecheck = game.checkGameWon()) {

        case "Play On" :
        gamecheck = game.checkGameWon()
        if(gamecheck === "Play On"){  //game has not been won
          if (nextButton.innerText === "Next"){ //button says next
            ccard.style.visibility = "hidden";
            winner = "PLAYER : " + game.playerHand.length + " vs " + game.computerHand.length + " : COMPUTER";
            nextButton.innerText = "Play" 
            UI.prototype.startButtonClick();
            game.selected = "";
          } 
          else 
          { //button says play
            winner = game.calculateWinner(game.selected)
            if(game.selected) {
              ccard.style.visibility = 'visible'; //makes ccard visible
            }
            game.selected = "";
            nextButton.innerText = "Next" //changes button to next
          }
        }
        break;

        case "Computer Has Won The Game!!" :
          winner = "You Lose -- Computer Wins the Game"
          nextButton.innerText = "New Game" 
          var msg = document.getElementById('text');
          msg.innerText = winner 
        break;

        case "Player Has Won The Game!!" :
          winner = "Whey Hey -- You WON"
          nextButton.innerText = "New Game"
          var msg = document.getElementById('text');
          msg.innerText = winner 
        break;
      }
    } else {
         location.href = "http://localhost:3000/";
    }
    
    var msg = document.getElementById('text');
    msg.innerText = winner 

  },

  resetColour: function(){
    document.getElementById('play-temp').style.backgroundColor = 'transparent';
    document.getElementById('play-wind').style.backgroundColor = 'transparent';
    document.getElementById('play-humidity').style.backgroundColor = 'transparent';
    document.getElementById('play-daylight').style.backgroundColor = 'transparent';
    document.getElementById('play-flight').style.backgroundColor = 'transparent';
  },

  clear: function(divID){
    while (divID.hasChildNodes()) {
      divID.removeChild(divID.firstChild);
    }
  },

  imgAppend: function(divId, elem, value) {
   var divId = document.querySelector(divId);
   UI.prototype.clear(divId)
   var elem = document.createElement(elem);
   elem.id = "image";
   elem.setAttribute("src", value);
   elem.setAttribute("width", "80%");
   elem.setAttribute("alt", "Picture of City");
   divId.appendChild(elem);
   },

  elemAppend: function(divId, elem, value) {
  var divId = document.getElementById(divId);
  UI.prototype.clear(divId)
  var elem = document.createElement(elem);
  elem.innerText = value;
  divId.appendChild(elem);
  },

  startButtonClick: function(){
    var value = "";
    var instr = document.querySelector(".instructions");
    instr.style.display = 'none';
    var main = document.querySelector(".main");
    main.style.display = 'block';
    UI.prototype.resetColour();
    console.log('button clicked --' + game.selected)

    //player display
    UI.prototype.elemAppend("player-city-header", 'h3', game.playerHand[0].name)
    UI.prototype.imgAppend(".player-city-image", "IMG", game.playerHand[0].imagepth)
    UI.prototype.elemAppend("play-temp","li", "Temperature: " + game.playerHand[0].temp + " C")
    UI.prototype.elemAppend("play-wind", "li", "Wind: " + game.playerHand[0].wind + " m/s")
    UI.prototype.elemAppend("play-humidity", "li", "Humidity: " + game.playerHand[0].humidity + " %")
    UI.prototype.elemAppend("play-daylight", "li", "Daylight: " + game.playerHand[0].daylight + " hours")
    var playPrice = game.playerHand[0].price;
         if (typeof playPrice === 'number'){
          value = "Flight from London: £" + playPrice;
       }else{
         value = "No Flights Available";
         game.playerHand[0].price = 0;
       }
    UI.prototype.elemAppend("play-flight","li", value)

    //computer display
    UI.prototype.elemAppend("computer-city-header", 'h3', game.computerHand[0].name)
    UI.prototype.imgAppend(".computer-city-image", "IMG", game.computerHand[0].imagepth)
    UI.prototype.elemAppend("comp-temp", "li", "Temperature: " + game.computerHand[0].temp + " C")
    UI.prototype.elemAppend("comp-wind", "li", "Wind: " + game.computerHand[0].wind + " m/s")
    UI.prototype.elemAppend("comp-humidity", "li", "Humidity: " + game.computerHand[0].humidity + " %")
    UI.prototype.elemAppend("comp-daylight", "li", "Daylight: " + game.computerHand[0].daylight + " hours")
    var compPrice = game.computerHand[0].price;
      if (typeof compPrice === 'number'){
        value = "Flight from London: £" + compPrice;
        }
      else
        {
        value = "No Flights Available";
         game.computerHand[0].price = 0;
        }
    UI.prototype.elemAppend("comp-flight", "li", value)
  },
}

module.exports = UI;
