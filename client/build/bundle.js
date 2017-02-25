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
  this.characteristic3 = {};
  this.characteristic4 = {};


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

var selected;

var UI = function() {

  var deck = new Deck();
 


  deck.all(function(result){
    var game = new Game();

    deck.getCards(result)
    deck.shuffleCards();
    console.log('game',game);
    game.dealCards(deck.cards);
    game.displayWeatherInfo(game.playerHand, "player");
    game.displayWeatherInfo(game.computerHand, "computer");


  }.bind(this));

  var playTemp = document.getElementById("play-temp");
  playTemp.addEventListener("click", this.tempclick);
  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", this.playButtonClick);



  // get numbers from api
  // populate template with numbers 


  
    

}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerHTML = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },


  render: function(xxxxx) {

    },

  tempclick: function() {
    console.log("temp captured")
    var pTemp = document.getElementById('play-temp');
    pTemp.style.backgroundColor = "green";
    //playerValue = playerHand[0].temp;
    selected = "temp";
  },

  windclick: function() {
    console.log("wind captured")
    var pWind = document.getElementById('play-wind');
    pWind.style.backgroundColor = "green";
    //playerValue = playerHand[0].wind;
   },

  playButtonClick: function(){
    //console.log(playerValue);

    game.calculateWinner(selected);
    console.log('we are here')

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
}

Game.prototype = {

  dealCards: function(Deck){
    
    for (var i = 0; i < Deck.length/2; i++){
      this.playerHand.push(Deck[i])
      console.log(Deck[i]);
    };
    for (var i = Deck.length/2; i < Deck.length; i++){
      this.computerHand.push(Deck[i])
    };
    console.log('player hand', this.playerHand);
  },

  displayWeatherInfo: function(hand, cardHolder){
    var cardToDisplay = hand[0].name;
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+cardToDisplay+",uk&appid=2e672e24267394ab5b555a4cc9857ccb";

    if (cardHolder === "player"){
      this.makeRequest(url, this.getPlayerWeatherInfo);
    } else {
      this.makeRequest(url, this.getComputerWeatherInfo);
    }   
  },

  // displayFlightInfo: function(hand, cardHolder){
  //     var cardToDisplay = hand[0].name;
  //     var url = ;

  //     if (cardHolder === "player"){
  //       this.makeRequest(url, this.getPlayerFlightInfo);
  //     } else {
  //       this.makeRequest(url, this.getComputerFlightInfo);
  //     }   
  //   },
  

   makeRequest: function(url, callback){
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = callback;
        request.send();
  },

  getPlayerWeatherInfo:  function(){
     if(this.status !== 200) return;

      var jsonString = this.responseText;
      var data = JSON.parse(jsonString);
      
  
      var temp = data.main.temp - 273.15;
      temp = temp.toFixed(2);
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
     
         
///////////////////////////////////////////////////////////////
      var playerTemp = document.getElementById("play-temp");
      var playerWind = document.getElementById("play-wind");

      var TempLi = document.createElement('li')
      var WindLi = document.createElement('li')

      console.log('playerhand', this.playerHand);
      
      TempLi.innerText = "Temperature: " + temp + " C";
      WindLi.innerText = "Wind: " + wind + " m/s";

      playerTemp.appendChild(TempLi);
      playerWind.appendChild(WindLi);
  },

  getComputerWeatherInfo:  function(){
     if(this.status !== 200) return;
      var jsonString = this.responseText;
      var data = JSON.parse(jsonString);
  
      var temp = data.main.temp - 273.15;
      temp = temp.toFixed(2);
      var wind = data.wind.speed;
      // var humidity = data.main.humidity;
      // var pressure = data.main.pressure;
       
///////////////////////////////////////////////////////////////
      var computerTemp = document.getElementById("comp-temp");
      var computerWind = document.getElementById("comp-wind");

      var TempLi = document.createElement('li')
      var WindLi = document.createElement('li')

      TempLi.innerText = "Temperature: " + temp + " C";
      WindLi.innerText = "Wind: " + wind + " m/s";

      computerTemp.appendChild(TempLi);
      computerWind.appendChild(WindLi);
  },

//   getPlayerFlightInfo:  function(){
//      if(this.status !== 200) return;

//       var jsonString = this.responseText;
//       var data = JSON.parse(jsonString);
//       console.log('this', this);
  
//       var price = "data.????"; 
// ///////////////////////////////////////////////////////////////
//       var playerPrice = document.getElementById("play-flight");
//       var PriceLi = document.createElement('li')
//       PriceLi.innerText = "Cheapest Flight: " + price;
//       playerPrice.appendChild(PriceLi);
//   },

//   getComputerFlightInfo:  function(){
//      if(this.status !== 200) return;

//       var jsonString = this.responseText;
//       var data = JSON.parse(jsonString);
//       console.log('this', this);
  
//       var price = "data.????"; 
// ///////////////////////////////////////////////////////////////
//       var computerPrice = document.getElementById("comp-flight");
//       var PriceLi = document.createElement('li')
//       PriceLi.innerText = "Cheapest Flight: " + price;
//       computerPrice.appendChild(PriceLi);
//   },

  displayInfo: function(temp, wind){
    playerTemp = getElementById("play-temp");
    playerWind = getElementById("play-wind");
    
    playerTemp.innerText = "Temperature: " + temp;
    playerWind.innerText = "Wind: " + wind;
    
  },

  calculateWinner: function(characteristic){
    switch (characteristic){

      case "temp":
        if (playerHand[0].temp > computerHand[0].temp) {
          return "player wins";
          break;
        }else if (playerHand[0].temp === computerHand[0].temp) {
          return'draw';
          break;
        }else {
          return "computer wins";
          break;
        }
      ;
      case "characteristic2" : 
      if (playerValue < computerValue) {
        console.log("player wins");
        break;
      }else if (playerValue === computerValue) {
        console.log("draw");
        break;
      }else {
        console.log ("computerwins");
        break;
      }
      ;

      case "characteristic3": 
      ;
      case "characteristic4": 
      ;
      } 

    },   

  checkGameWon: function(){
    if (this.playerHand === []){
      playerWon();
    } else {
      if (this.computerHand === []){
        computerWon()
      }
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