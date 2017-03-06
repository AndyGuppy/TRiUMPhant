var Card = require('./card');
var Deck = require('./deck');

var Game = function(){

  this.resetGame()

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

  getWeatherInfo: function(data, hand) {
    hand[0].temp = (data.main.temp - 273.15).toFixed(1);
    hand[0].wind = data.wind.speed;
    hand[0].humidity = data.main.humidity;
    hand[0].daylight = ((data.sys.sunset - data.sys.sunrise) / 60 / 60).toFixed(1);
  },

  getPlayerWeatherInfo:  function(data){
    this.getWeatherInfo(data,game.playerHand)
  },

  getComputerWeatherInfo:  function(data){
    this.getWeatherInfo(data,game.computerHand)
  },

  getPlayerFlightInfo:  function(data){
    this.playerHand[0].price = data.Dates.OutboundDates[0].Price; 
  },

  getComputerFlightInfo:  function(data){
    this.computerHand[0].price = data.Dates.OutboundDates[0].Price;
  },
 
 winner: function(winHand, loseHand) {
  var cardOne = winHand[0];
  var cardTwo = loseHand[0];
  winHand.shift();
  loseHand.shift();
  winHand.push(cardOne);
  winHand.push(cardTwo);
  if(loseHand.length !== 0){
   this.displayWeatherInfo(game.playerHand, "player");
   this.displayWeatherInfo(game.computerHand, "computer");   
   this.displayFlightInfo(game.playerHand, "player");
   this.displayFlightInfo(game.computerHand, "computer"); 
  }
 },


  compWins: function(){
    this.winner(game.computerHand, game.playerHand)
    game.whosTurn = "computer"
    return 'computer wins';
  },

  playWins: function(){
    this.winner(game.playerHand, game.computerHand)
    game.whosTurn = "player"
    return 'player wins';
  },

  choiceNumber: function(){
    return Math.random() * (5 - 1) + 1;
  },

  computerChoice: function(comp_choice) {
    var cTemp = document.getElementById("comp-temp")
    var cWind = document.getElementById("comp-wind")
    var cHumid = document.getElementById("comp-humidity")
    var cDayl = document.getElementById("comp-daylight")
    var cPrice = document.getElementById("comp-flight")

    switch (comp_choice){
      case 1:
        cTemp.style.backgroundColor = "#5F9EA0";
        return "temp";
        break;
     
      case 2:
        cWind.style.backgroundColor = "#5F9EA0"
        return "wind";
        break;
      case 3:
        cHumid.style.backgroundColor = "#5F9EA0"
        return "humidity";
        break;

      case 4:
        cDayl.style.backgroundColor = "#5F9EA0"
        return "daylight";
        break;

      case 5:
        cPrice.style.backgroundColor = "#5F9EA0"
        return "flight";
        break;
    };
  },



  calculateWinner: function(characteristic){
    switch (characteristic){

      case "":
        return "Make a selection before playing";
        break;

      case "temp":
        if (parseFloat(this.playerHand[0].temp) > parseFloat(this.computerHand[0].temp)) {
          return  this.playWins()
          break;
        }else {
          return  this.compWins()
          break;
        };

      case "wind" : 
        if (this.playerHand[0].wind < this.computerHand[0].wind) {
          return this.playWins()
          break;
        }else {
          return this.compWins()
          break;
        };

      case "humidity": 
        var playerHumidity = Math.abs(this.playerHand[0].humidity - 45);
        var computerHumidity = Math.abs(this.computerHand[0].humidity - 45);
        if (playerHumidity < computerHumidity){
          return this.playWins()
        }else {
          return this.compWins()      
        }
        break;
        case "daylight": 
        if (parseFloat(this.playerHand[0].daylight) > parseFloat(this.computerHand[0].daylight)){
          return this.playWins()
        }else{
          return this.compWins()
        }
        break;
        case "flight": 
        if (parseFloat(this.playerHand[0].price) < parseFloat(this.computerHand[0].price)){
          return this.playWins()
        }else{
          return this.compWins()
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
}

  module.exports = Game;