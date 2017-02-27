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