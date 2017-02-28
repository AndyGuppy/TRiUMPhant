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

  tempClick: function() {
    var pTemp = document.getElementById('play-temp');
    UI.prototype.resetColour();
    pTemp.style.backgroundColor = "#5F9EA0";
    game.selected = "temp";
  },

  windClick: function() {
    var pWind = document.getElementById('play-wind');
    UI.prototype.resetColour();
    pWind.style.backgroundColor = "#5F9EA0";
    game.selected = "wind";
  },

  humidityClick: function() {
    var pHumidity = document.getElementById('play-humidity');
    UI.prototype.resetColour();
    pHumidity.style.backgroundColor = "#5F9EA0";
    game.selected = "humidity";
  },

  daylightClick: function() {
    var pDaylight = document.getElementById('play-daylight');
    UI.prototype.resetColour();
    pDaylight.style.backgroundColor = "#5F9EA0";
    game.selected = "daylight";
  },

  flightClick: function() {
    var pFlight = document.getElementById('play-flight');
    UI.prototype.resetColour();
    pFlight.style.backgroundColor = "#5F9EA0";
    game.selected = "flight";
  },

  playButtonClick: function(){
    var nextButton = document.getElementById('play-button');
    var ccard = document.querySelector(".ccard");
    
    var winner = "";
    if (nextButton.innerText !== "New Game"){
      switch (gamecheck = game.checkGameWon()) {

        case "Play On" :
        gamecheck = game.checkGameWon()
        if(gamecheck === "Play On"){ 
          if (nextButton.innerText === "Next"){
            ccard.style.visibility = "hidden";
            winner = "PLAYER : " + game.playerHand.length + " vs " + game.computerHand.length + " : COMPUTER";
            nextButton.innerText = "Play" 
            UI.prototype.startButtonClick();
            console.log('Next button clicked --' + game.selected)
          } else {
            winner = game.calculateWinner(game.selected)
            game.selected = "";
            ccard.style.visibility = 'visible';
            nextButton.innerText = "Next"
            console.log('Play button clicked --' + game.selected)
          }
        }
        break;

        case "Computer Has Won The Game!!" :
          winner = "You Lose -- Computer Wins the Game"
          nextButton.innerText = "New Game" 
          var msg = document.getElementById('text');
          msg.innerText = winner 
          console.log(winner)


        break;

        case "Player Has Won The Game!!" :
          winner - "Whey Hey -- You WON"
          nextButton.innerText = "New Game"
          var msg = document.getElementById('text');
          msg.innerText = winner 
          console.log(winner)


        break;



      }
    }else
      {
         // game.resetGame();
         // UI.prototype.startButtonClick();
         // nextButton.innerText = "Play";
         location.href = "http://localhost:3000/";
    }
    

    var msg = document.getElementById('text');
    msg.innerText = winner 
    console.log(winner)

  },

  resetColour: function(){
    document.getElementById('play-temp').style.backgroundColor = 'transparent';
    document.getElementById('play-wind').style.backgroundColor = 'transparent';
    document.getElementById('play-humidity').style.backgroundColor = 'transparent';
    document.getElementById('play-daylight').style.backgroundColor = 'transparent';
    document.getElementById('play-flight').style.backgroundColor = 'transparent';
  },

  clear: function(divID){
    console.log("hiding - " + divID)
    var div = document.getElementById(divID);
    while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
    }
  },

  startButtonClick: function(){

    var instr = document.querySelector(".instructions");
    instr.style.display = 'none';
    var main = document.querySelector(".main");
    main.style.display = 'block';

    UI.prototype.resetColour();

    console.log('button clicked --' + game.selected)

    // UI.prototype.clear("player-city-header");
    var playerCardHeader = document.getElementById("player-city-header");
    while (playerCardHeader.hasChildNodes()) {
      playerCardHeader.removeChild(playerCardHeader.firstChild);
    } 
    var playerCityName = document.createElement('h3');
    playerCityName.innerText = game.playerHand[0].name;
    playerCardHeader.appendChild(playerCityName);

    var playerCardImg = document.querySelector(".player-city-image");
    while (playerCardImg.hasChildNodes()) {
      playerCardImg.removeChild(playerCardImg.firstChild);
    }    
    var photo = document.createElement("IMG");
    console.log(game.playerHand[0].imagepth)
    photo.id = "image";
    photo.setAttribute("src", game.playerHand[0].imagepth);
    photo.setAttribute("width", "80%");
    photo.setAttribute("alt", "Picture of City");
    playerCardImg.appendChild(photo);

    var playerTemp = document.getElementById("play-temp");
    var playerWind = document.getElementById("play-wind");
    var playerHumid = document.getElementById("play-humidity");
    var playerDaylight = document.getElementById("play-daylight");
    var playerPrice = document.getElementById("play-flight");

    while (playerTemp.hasChildNodes()) {
      playerTemp.removeChild(playerTemp.firstChild);
    }
    while (playerWind.hasChildNodes()) {
      playerWind.removeChild(playerWind.firstChild);
    }
    while (playerHumid.hasChildNodes()) {
      playerHumid.removeChild(playerHumid.firstChild);
    }
    while (playerDaylight.hasChildNodes()) {
      playerDaylight.removeChild(playerDaylight.firstChild);
    }
    while (playerPrice.hasChildNodes()) {
      playerPrice.removeChild(playerPrice.firstChild);
    }

    var tempLi = document.createElement('li');
    var windLi = document.createElement('li');
    var humidLi = document.createElement('li');
    var dayLi = document.createElement('li');
    var PriceLi = document.createElement('li');

    tempLi.innerText = "Temperature: " + game.playerHand[0].temp + " C";
    windLi.innerText = "Wind: " + game.playerHand[0].wind + " m/s";
    humidLi.innerText = "Humidity: " + game.playerHand[0].humidity + " %";
    dayLi.innerText = "Daylight: " + game.playerHand[0].daylight + " hours";
    PriceLi.innerText = "Flight from London: £" + game.playerHand[0].price;

    playerTemp.appendChild(tempLi);
    playerWind.appendChild(windLi);
    playerHumid.appendChild(humidLi);
    playerDaylight.appendChild(dayLi);
    playerPrice.appendChild(PriceLi);


    //computer display
    var computerCardHeader = document.getElementById("computer-city-header");
    while (computerCardHeader.hasChildNodes()) {
      computerCardHeader.removeChild(computerCardHeader.firstChild);
    } 
    var computerCityName = document.createElement('h3');
    computerCityName.innerText = game.computerHand[0].name;
    computerCardHeader.appendChild(computerCityName); 

    var computerCardImg = document.querySelector(".computer-city-image");
    while (computerCardImg.hasChildNodes()) {
      computerCardImg.removeChild(computerCardImg.firstChild);
    }    
    var photo = document.createElement("IMG");
    photo.id = "image";
    photo.setAttribute("src", game.computerHand[0].imagepth);
    photo.setAttribute("width", "80%");
    photo.setAttribute("alt", "Picture of City");
    computerCardImg.appendChild(photo);

    var computerTemp = document.getElementById("comp-temp");
    var computerWind = document.getElementById("comp-wind");
    var computerHumid = document.getElementById("comp-humidity");
    var computerDaylight = document.getElementById("comp-daylight");
    var computerPrice = document.getElementById("comp-flight");

    while (computerTemp.hasChildNodes()) {
     computerTemp.removeChild(computerTemp.firstChild);
   }
   while (computerWind.hasChildNodes()) {
     computerWind.removeChild(computerWind.firstChild);
   }
   while (computerHumid.hasChildNodes()) {
     computerHumid.removeChild(computerHumid.firstChild);
   }
   while (computerDaylight.hasChildNodes()) {
     computerDaylight.removeChild(computerDaylight.firstChild);
   }
   while (computerPrice.hasChildNodes()) {
    computerPrice.removeChild(computerPrice.firstChild);
  }

  var tempLi = document.createElement('li')
  var windLi = document.createElement('li')
  var humidLi = document.createElement('li')
  var dayLi = document.createElement('li')
  var PriceLi = document.createElement('li');

  tempLi.innerText = "Temperature: " + game.computerHand[0].temp + " C";
  windLi.innerText = "Wind: " + game.computerHand[0].wind + " m/s";
  humidLi.innerText = "Humidity: " + game.computerHand[0].humidity + " %";
  dayLi.innerText = "Daylight: " + game.computerHand[0].daylight + " hours";
  PriceLi.innerText = "Flight from London: £" + game.computerHand[0].price;

  computerTemp.appendChild(tempLi);
  computerWind.appendChild(windLi);
  computerHumid.appendChild(humidLi);
  computerDaylight.appendChild(dayLi);
  computerPrice.appendChild(PriceLi);


},

}


module.exports = UI;
