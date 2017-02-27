/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Card = function(dbOptions){
  this.name = dbOptions.name;
  this.imagepth = dbOptions.imagepth;
  this.skycode = dbOptions.skycode;
  this.temp = {};
  this.wind = {};
  this.humidity = {};
  this.daylight = {};
  this.price = {};


}

Card.prototype = {
   
}

module.exports = Card;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Card = __webpack_require__(0);
var shuffle = __webpack_require__(4);

var Deck = function(){
  this.cards = [];
}

Deck.prototype = {

  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  all: function(callback){
    this.makeRequest('http://localhost:3000/cards', function(){
      if (this.status !== 200) return;
        var jsonString = this.responseText 
        var result = JSON.parse(jsonString);
        callback(result);
    }); 
  },

  getCards: function(dbResults){
    for (var object of dbResults){
      var newCard = new Card(object);
      this.cards.push(newCard);
    };
  },

  

  shuffleCards: function(){
    shuffle(this.cards)
  }
}


module.exports = Deck;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Deck = __webpack_require__(1);
var Game = __webpack_require__(3);
var Card = __webpack_require__(0);

var UI = function() {

game = new Game()

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

  var showButton = document.getElementById("show-button");
  showButton.addEventListener("click", this.showButtonClick, game);


}

UI.prototype = {

  tempClick: function() {
    var pTemp = document.getElementById('play-temp');
    UI.prototype.resetColour();
    pTemp.style.backgroundColor = "green";
    game.selected = "temp";
  },

  windClick: function() {
    var pWind = document.getElementById('play-wind');
    UI.prototype.resetColour();
    pWind.style.backgroundColor = "green";
    game.selected = "wind";
   },

  humidityClick: function() {
     var pHumidity = document.getElementById('play-humidity');
     UI.prototype.resetColour();
     pHumidity.style.backgroundColor = "green";
     game.selected = "humidity";
   },

  daylightClick: function() {
     var pDaylight = document.getElementById('play-daylight');
     UI.prototype.resetColour();
     pDaylight.style.backgroundColor = "green";
     game.selected = "daylight";
   },

   flightClick: function() {
      var pFlight = document.getElementById('play-flight');
      UI.prototype.resetColour();
      pFlight.style.backgroundColor = "green";
      game.selected = "flight";
    },
  playButtonClick: function(){
    console.log('button clicked --' + game.selected)
    game.calculateWinner(game.selected)
    game.selected = "";
    },

  resetColour: function(){

    document.getElementById('play-temp').style.backgroundColor = "ivory";
    document.getElementById('play-wind').style.backgroundColor = "ivory";
    document.getElementById('play-humidity').style.backgroundColor = "ivory";
    document.getElementById('play-daylight').style.backgroundColor = "ivory";
    document.getElementById('play-flight').style.backgroundColor = "ivory";
  },

  showButtonClick: function(){

    UI.prototype.resetColour();

    console.log('button clicked --' + game.selected)
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

    
    
    


  }


}
  

module.exports = UI;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Card = __webpack_require__(0);
var Deck = __webpack_require__(1);

var Game = function(){
  this.playerHand = []
  this.computerHand = []


  this.selected =""

  var deck = new Deck();

  deck.all(function(result){
    deck.getCards(result);
    deck.shuffleCards();
    this.dealCards(deck.cards);
    this.displayWeatherInfo(this.playerHand, "player");
    this.displayWeatherInfo(this.computerHand, "computer");
    this.displayFlightInfo(this.playerHand, "player");
    this.displayFlightInfo(this.computerHand, "computer");


  }.bind(this));
}

Game.prototype = {


  dealCards: function(deck){


    for (var i = 0; i < deck.length/2; i++){
      this.playerHand.push(deck[i])
    };

    for (var i = deck.length/2; i < deck.length; i++){
      this.computerHand.push(deck[i])

    };
  },


  displayWeatherInfo: function(hand, cardHolder){
    var cardToDisplay = hand[0].name;

    var url = "http://api.openweathermap.org/data/2.5/weather?q="+cardToDisplay+"&appid=2e672e24267394ab5b555a4cc9857ccb";

    if (cardHolder === "player"){
      this.makeRequest(url, this.getPlayerWeatherInfo.bind(this)); //
    } else {
      this.makeRequest(url, this.getComputerWeatherInfo.bind(this)); //
    }   
  },

  displayFlightInfo: function(hand, cardHolder){
    var cardToDisplay = hand[0].skycode;
    console.log('look here', cardToDisplay);

    var url = 'http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/LON/'+cardToDisplay+'/anytime/anytime?apiKey=st987503221578212781689572896099';

    if (cardHolder === "player"){
      this.makeRequest(url, this.getPlayerFlightInfo.bind(this));
    } else {
      this.makeRequest(url, this.getComputerFlightInfo.bind(this));
    }
  },

  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
      if (this.status != 200) return;
        var jsonString = this.responseText;
        var data = JSON.parse(jsonString);
  
        callback(data);
      };
      request.send();
    },

  getPlayerWeatherInfo:  function(data){

    var temp = data.main.temp - 273.15;
    temp = temp.toFixed(1);
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var daylight = (data.sys.sunset - data.sys.sunrise) / 60 / 60;
    daylight = daylight.toFixed(1)


    this.playerHand[0].temp = temp
    this.playerHand[0].wind = wind
    this.playerHand[0].humidity = humidity
    this.playerHand[0].daylight = daylight


  },

  getComputerWeatherInfo:  function(data){

    var temp = data.main.temp - 273.15;
    temp = temp.toFixed(1);
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var daylight = (data.sys.sunset - data.sys.sunrise) / 60 / 60;
    daylight = daylight.toFixed(1)

    this.computerHand[0].temp = temp
    this.computerHand[0].wind = wind
    this.computerHand[0].humidity = humidity
    this.computerHand[0].daylight = daylight

    


  },

  getPlayerFlightInfo:  function(data){

    var price = data.Dates.OutboundDates[0].Price; 
    this.playerHand[0].price = price;

  },

  getComputerFlightInfo:  function(data){

    var price = data.Dates.OutboundDates[0].Price;
    this.computerHand[0].price = price;

  },



  calculateWinner: function(characteristic){
    
    switch (characteristic){

      case "temp":
        if (this.playerHand[0].temp > this.computerHand[0].temp) {

          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.playerHand.push(playerCard);
          this.playerHand.push(computerCard);
         
          
          
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");

          console.log("player wins");

          console.log("player hand", this.playerHand.length);

          break;
        }else {
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.computerHand.push(playerCard);
          this.computerHand.push(computerCard);
          
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
         
         
          console.log("computer wins");
          console.log("computer hand", this.computerHand.length);
          break;
        };


        case "wind" : 

        if (this.playerHand[0].wind < this.computerHand[0].wind) {
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.computerHand.push(playerCard);
          this.computerHand.push(computerCard);
          
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
          
          
          console.log("computer wins");
          console.log("computer hand", this.computerHand.length);

          break;
        }else {
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.computerHand.push(playerCard);
          this.computerHand.push(computerCard);
          
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
          console.log("computer wins");
          console.log("computer hand", this.computerHand.length);
          break;
        };

        case "humidity": 
        var playerHumidity = Math.abs(this.playerHand[0].humidity - 45);
        var computerHumidity = Math.abs(this.computerHand[0].humidity - 45);
        if (playerHumidity < computerHumidity){
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.playerHand.push(playerCard);
          this.playerHand.push(computerCard);       
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
          console.log('player wins');
          console.log("player hand", this.playerHand.length);
        }else {
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.computerHand.push(playerCard);
          this.computerHand.push(computerCard);
          
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
          console.log("computer wins");
          console.log("computer hand", this.computerHand.length);          
        }
        break;
        case "daylight": 
        if (this.playerHand[0].daylight > this.computerHand[0].daylight){
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.playerHand.push(playerCard);
          this.playerHand.push(computerCard);
                   
                    
                    
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
          console.log('player wins');
          console.log("player hand", this.playerHand.length);
        }else{
          var playerCard = this.playerHand[0];
          var computerCard = this.computerHand[0];
          this.playerHand.shift();
          this.computerHand.shift();
          this.computerHand.push(playerCard);
          this.computerHand.push(computerCard);
          
          this.displayCardCity();
          this.displayWeatherInfo(this.playerHand, "player");
          this.displayWeatherInfo(this.computerHand, "computer");
          console.log("computer wins");
          console.log("computer hand", this.computerHand.length);
        }
        break;
      }; 

    },   

  checkGameWon: function(){
    if(this.playerHand.length === 0){
      computerWon();
    }else if (this.computerHand.length === 0) {
      playerWon();
    }
  },

  playerWon: function(){

  },

  computerWon: function(){

  }

}


  module.exports = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Randomize the order of the elements in a given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Array}
 */
function shuffle(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle expect an array as parameter.');
  }

  options = options || {};

  var collection = arr,
      len = arr.length,
      rng = options.rng || Math.random,
      random,
      temp;

  if (options.copy === true) {
    collection = arr.slice();
  }

  while (len) {
    random = Math.floor(rng() * len);
    len -= 1;
    temp = collection[len];
    collection[len] = collection[random];
    collection[random] = temp;
  }

  return collection;
};

/**
 * Pick one or more random elements from the given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Object}
 */
shuffle.pick = function(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle.pick() expect an array as parameter.');
  }

  options = options || {};

  var rng = options.rng || Math.random,
      picks = options.picks || 1;

  if (typeof picks === 'number' && picks !== 1) {
    var len = arr.length,
        collection = arr.slice(),
        random = [],
        index;

    while (picks && len) {
      index = Math.floor(rng() * len);
      random.push(collection[index]);
      collection.splice(index, 1);
      len -= 1;
      picks -= 1;
    }

    return random;
  }

  return arr[Math.floor(rng() * arr.length)];
};

/**
 * Expose
 */
module.exports = shuffle;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(2);

var app = function() {
  new UI();
}

window.onload = app;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map