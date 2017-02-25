var Card = require('./card');
var Deck = require('./deck');

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
        temp = temp.toFixed(2);
        var wind = data.wind.speed;
        var humidity = data.main.humidity;
        this.playerHand[0].temp = temp
        this.playerHand[0].wind = wind

           
  ///////////////////////////////////////////////////////////////
        var playerTemp = document.getElementById("play-temp");
        var playerWind = document.getElementById("play-wind");

        var TempLi = document.createElement('li')
        var WindLi = document.createElement('li')

        
        TempLi.innerText = "Temperature: " + temp + " C";
        WindLi.innerText = "Wind: " + wind + " m/s";

        playerTemp.appendChild(TempLi);
        playerWind.appendChild(WindLi);
    },

    getComputerWeatherInfo:  function(data){
        var temp = data.main.temp - 273.15;
        temp = temp.toFixed(2);
        var wind = data.wind.speed;
        this.computerHand[0].temp = temp
        this.computerHand[0].wind = wind
      
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