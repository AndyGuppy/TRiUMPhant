var Deck = require('../models/deck');
var Game = require('../models/game');
var Card = require('../models/card');

var UI = function() {

  game = new Game()

  // this.showButtonClick(game);

  var playTemp = document.getElementById("play-temp");
  playTemp.addEventListener("click", this.tempClick.bind(this), game);

  var playWind = document.getElementById("play-wind");
  playWind.addEventListener("click", this.windClick.bind(this), game);

  var playHumidity = document.getElementById("play-humidity");
  playHumidity.addEventListener("click", this.humidityClick.bind(this), game);
  
  var playDaylight = document.getElementById("play-daylight");
  playDaylight.addEventListener("click", this.daylightClick.bind(this), game);

  var playFlight = document.getElementById("play-flight");
  playFlight.addEventListener("click", this.flightClick.bind(this), game);

  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", this.playButtonClick.bind(this), game);

  var startButton = document.getElementById("start-button");
  startButton.addEventListener("click", this.startButtonClick.bind(this), game);

}

UI.prototype = {

  divClick: function(divId,selected){
    var divId = document.getElementById(divId);
    this.resetColour('play');
    divId.style.backgroundColor = "#5F9EA0";
    game.selected = selected;
  },

  tempClick: function() {
    this.divClick('play-temp',"temp");
  },

  windClick: function() {
    this.divClick('play-wind',"wind")
  },

  humidityClick: function() {
    this.divClick('play-humidity',"humidity")
  },

  daylightClick: function() {
    this.divClick('play-daylight',"daylight")
  },

  flightClick: function() {
    this.divClick('play-flight',"flight")
  },

  playButtonClick: function(){
    var nextButton = document.getElementById('play-button');
    var ccard = document.querySelector(".ccard");
    var pcard = document.querySelector(".pcard");
    var winner = "";
    if (nextButton.innerText !== "New Game"){
      switch (gamecheck = game.checkGameWon()) {

        case "Play On" :
          gamecheck = game.checkGameWon()
          if(gamecheck === "Play On"){  //game has not been won
            if (nextButton.innerText === "Next"){ //button says next
              if (game.whosTurn === "computer"){
                ccard.style.visibility = "visible";
                pcard.style.visibility = "hidden";
                winner = "PLAYER : " + game.playerHand.length + " vs " + game.computerHand.length + " : COMPUTER";
                nextButton.innerText = "Play" 
                this.startButtonClick();
                game.selected = "";
                this.resetColour('comp');
              }
              else
              {
                ccard.style.visibility = "hidden";
                pcard.style.visibility = "visible";
                winner = "PLAYER : " + game.playerHand.length + " vs " + game.computerHand.length + " : COMPUTER";
                nextButton.innerText = "Play" 
                this.startButtonClick();
                game.selected = "";
                this.resetColour('comp');
              }
            } 
            else 
            { //button says play
              if (game.whosTurn === "player"){
                winner = game.calculateWinner(game.selected)
                if(game.selected) {
                  ccard.style.visibility = 'visible'; //makes ccard visible
                }
                game.selected = "";
                nextButton.innerText = "Next" //changes button to next
              }
              else 
              {
                var someNumber = parseInt(game.choiceNumber());
                game.selected = game.computerChoice(someNumber);
                winner = game.calculateWinner(game.selected);
                game.selected = "";
                ccard.style.visibility = 'visible'; //makes ccard visible
                pcard.style.visibility = "visible";
                nextButton.innerText = "Next" //changes button to next
              };
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
    } 
    else 
    {
      location.href = "http://localhost:3000/";
    }
    
    var msg = document.getElementById('text');
    msg.innerText = winner 

  },

  resetColour: function(type){
    document.getElementById(type + '-temp').style.backgroundColor = 'transparent';
    document.getElementById(type + '-wind').style.backgroundColor = 'transparent';
    document.getElementById(type + '-humidity').style.backgroundColor = 'transparent';
    document.getElementById(type + '-daylight').style.backgroundColor = 'transparent';
    document.getElementById(type + '-flight').style.backgroundColor = 'transparent';
  },

  clear: function(divID){
    while (divID.hasChildNodes()) {
      divID.removeChild(divID.firstChild);
    }
  },

  imgAppend: function(divId, elem, value) {
   var divId = document.querySelector(divId);
   this.clear(divId)
   var elem = document.createElement(elem);
   elem.id = "image";
   elem.setAttribute("src", value);
   elem.setAttribute("width", "80%");
   elem.setAttribute("alt", "Picture of City");
   divId.appendChild(elem);
   },

  elemAppend: function(divId, elem, value) {
  var divId = document.getElementById(divId);
  this.clear(divId)
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
    this.resetColour('play');
    console.log('button clicked --' + game.selected)
    console.log(this)
    //player display
    this.elemAppend("player-city-header", 'h3', game.playerHand[0].name)
    this.imgAppend(".player-city-image", "IMG", game.playerHand[0].imagepth)
    this.elemAppend("play-temp","li", "Temperature: " + game.playerHand[0].temp + " C")
    this.elemAppend("play-wind", "li", "Wind: " + game.playerHand[0].wind + " m/s")
    this.elemAppend("play-humidity", "li", "Humidity: " + game.playerHand[0].humidity + " %")
    this.elemAppend("play-daylight", "li", "Daylight: " + game.playerHand[0].daylight + " hours")
    var playPrice = game.playerHand[0].price;
         if (typeof playPrice === 'number'){
          value = "Flight from London: £" + playPrice;
       }else{
         value = "No Flights Available";
         game.playerHand[0].price = 0;
       }
    this.elemAppend("play-flight","li", value)

    //computer display
    this.elemAppend("computer-city-header", 'h3', game.computerHand[0].name)
    this.imgAppend(".computer-city-image", "IMG", game.computerHand[0].imagepth)
    this.elemAppend("comp-temp", "li", "Temperature: " + game.computerHand[0].temp + " C")
    this.elemAppend("comp-wind", "li", "Wind: " + game.computerHand[0].wind + " m/s")
    this.elemAppend("comp-humidity", "li", "Humidity: " + game.computerHand[0].humidity + " %")
    this.elemAppend("comp-daylight", "li", "Daylight: " + game.computerHand[0].daylight + " hours")
    var compPrice = game.computerHand[0].price;
      if (typeof compPrice === 'number'){
        value = "Flight from London: £" + compPrice;
        }
      else
        {
        value = "No Flights Available";
         game.computerHand[0].price = 0;
        }
    this.elemAppend("comp-flight", "li", value)
  },
}

module.exports = UI;
