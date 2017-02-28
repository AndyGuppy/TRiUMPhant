var Card = require('./card');
var Deck = require('./deck');

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

  resetGame: function(){
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

  },

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
    game.playerHand[0].temp = temp
    game.playerHand[0].wind = wind
    game.playerHand[0].humidity = humidity
    game.playerHand[0].daylight = daylight


  },

  getComputerWeatherInfo:  function(data){
    var temp = data.main.temp - 273.15;
    temp = temp.toFixed(1);
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var daylight = (data.sys.sunset - data.sys.sunrise) / 60 / 60;
    daylight = daylight.toFixed(1)
    game.computerHand[0].temp = temp
    game.computerHand[0].wind = wind
    game.computerHand[0].humidity = humidity
    game.computerHand[0].daylight = daylight
  },

  getPlayerFlightInfo:  function(data){
    var price = data.Dates.OutboundDates[0].Price; 
    this.playerHand[0].price = price;
  },

  getComputerFlightInfo:  function(data){
    var price = data.Dates.OutboundDates[0].Price;
    this.computerHand[0].price = price;
  },

  compWins: function(){
    var playerCard = game.playerHand[0];
    var computerCard = game.computerHand[0];
    game.playerHand.shift();
    game.computerHand.shift();
    game.computerHand.push(playerCard);
    game.computerHand.push(computerCard);
     if(game.playerHand.length !== 0){
    this.displayWeatherInfo(game.playerHand, "player");
    this.displayWeatherInfo(game.computerHand, "computer");   
     }
    console.log("computer wins");
    console.log("computer hand", game.computerHand.length);
    return 'computer wins';
  },

  playWins: function(){
    var playerCard = game.playerHand[0];
    var computerCard = game.computerHand[0];
    game.playerHand.shift();
    game.computerHand.shift();
    game.playerHand.push(playerCard);
    game.playerHand.push(computerCard);
    if(game.computerHand.length !== 0){
   this.displayWeatherInfo(game.playerHand, "player");
   this.displayWeatherInfo(game.computerHand, "computer");   
    }

    console.log("player wins");
    console.log("player hand", game.playerHand.length);
    return 'player wins';
  },

  calculateWinner: function(characteristic){
    switch (characteristic){

      case "":
        return "Make a selection before playing";
        break;

      case "temp":
        if (parseFloat(this.playerHand[0].temp) > parseFloat(this.computerHand[0].temp)) {
          return  Game.prototype.playWins()
          break;
        }else {
          return  Game.prototype.compWins()
          break;
        };

      case "wind" : 
        if (this.playerHand[0].wind < this.computerHand[0].wind) {
          return Game.prototype.playWins()
          break;
        }else {
          return Game.prototype.compWins()
          break;
        };

      case "humidity": 
        var playerHumidity = Math.abs(this.playerHand[0].humidity - 45);
        var computerHumidity = Math.abs(this.computerHand[0].humidity - 45);
        if (playerHumidity < computerHumidity){
          return Game.prototype.playWins()
        }else {
          return Game.prototype.compWins()      
        }
        break;
        case "daylight": 
        if (parseFloat(this.playerHand[0].daylight) > parseFloat(this.computerHand[0].daylight)){
          return Game.prototype.playWins()
        }else{
          return Game.prototype.compWins()
        }
        break;
      }; 

    },   

    checkGameWon: function(){
       if (this.playerHand.length === 0){
        return "Computer Has Won The Game!!";
       }else if (this.computerHand.length === 0) {
         return "Player Has Won The Game!!";
       }else{
         return "Play On";
       }
     },

  playerWon: function(){

  },

  computerWon: function(){

  }

}


  module.exports = Game;