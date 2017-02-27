var Card = require('./card');
var Deck = require('./deck');

var Game = function(){
  this.playerHand = []
  this.computerHand = []

  this.selected =""

  var deck = new Deck();

  deck.all(function(result){
    deck.getCards(result)
    deck.shuffleCards();
    this.dealCards(deck.cards);
    this.displayWeatherInfo(this.playerHand, "player");
    this.displayWeatherInfo(this.computerHand, "computer");

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


  calculateWinner: function(characteristic){
    
    switch (characteristic){
      case "temp":
        if (this.playerHand[0].temp > this.computerHand[0].temp) {
          console.log("player wins");
          break;
        }else if (this.playerHand[0].temp === this.computerHand[0].temp) {
          console.log("draw");
          break;
        }else {
          console.log("computer wins");
          break;
        };

      case "wind" : 
        if (playerValue < computerValue) {
          console.log("player wins");
          break;
        }else if (playerValue === computerValue) {
          console.log("draw");
          break;
        }else {
          console.log ("computerwins");
          break;
      };

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