var Card = require('./card');
var Deck = require('./deck');

var Game = function(){
  this.playerHand = []
  this.computerHand = []
}

Game.prototype = {

  dealCards: function(Deck){
    console.log('deck in deal', Deck)
    for (var i = 0; i < Deck.length/2; i++){
      this.playerHand.push(Deck[i])
    };
    for (var i = Deck.length/2; i < Deck.length; i++){
      this.computerHand.push(Deck[i])
    };
    console.log('player hand', this.playerHand)
  },

  displayCardInfo: function(hand){
    var cardToDisplay = hand[0].name;
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+cardToDisplay+",uk&appid=2e672e24267394ab5b555a4cc9857ccb";

    this.makeRequest(url, this.getWeatherInfo);
    
  },

   makeRequest: function(url, callback){
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = callback;
        request.send();
  },

  getWeatherInfo:  function(){
     if(this.status !== 200) return;

      var jsonString = this.responseText;
      var data = JSON.parse(jsonString);
      console.log('this', this);
  
      var temp = data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
      var pressure = data.main.pressure;
      var name = data.name;
      console.log("disp info", this);
      

///////////////////////////////////////////////////////////////
      playerTemp = document.getElementById("play-temp");
      playerWind = document.getElementById("play-wind");

      var TempLi = document.createElement('li')
      var WindLi = document.createElement('li')

      
      TempLi.innerText = "Temperature: " + temp;
      WindLi.innerText = "Wind: " + wind;

      var tempDiv = document.getElementById("player-temp");
      var windDiv = document.getElementById("wind-temp");

      tempDiv.appendChild(TempLi);
      windDiv.appendChild(WindLi);

      
      console.log("temp: "+temp+"  wind: "+wind+"  humidity: "+humidity+"  pressure: "+pressure+ "  name: "+name);
  },

  displayInfo: function(temp, wind){
    playerTemp = getElementById("play-temp");
    playerWind = getElementById("play-wind");
    
    playerTemp.innerText = "Temperature: " + temp;
    playerWind.innerText = "Wind: " + wind;
    
  },

  calculateWinner: function(playerValue, computerValue, characteristic){
    switch (characteristic){

      case "characteristic1":
        if (playerValue > computerValue) {
          return "player wins";
          break;
        }else if (playerValue === computerValue) {
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