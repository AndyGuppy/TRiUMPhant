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
    this.displayCardCity();
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

  displayCardCity: function(){
    //player display
    var cardHeader = document.getElementById("player-city-header");
    var playerCityName = document.createElement('h3');
    playerCityName.innerText = this.playerHand[0].name;

    while (cardHeader.hasChildNodes()) {
         cardHeader.removeChild(cardHeader.firstChild);
     }
    cardHeader.appendChild(playerCityName); 

    



    var cardHeader = document.querySelector(".player-city-image");
    var photo = document.createElement("IMG");
    console.log(this.playerHand[0].imagepth)
    photo.setAttribute("src", this.playerHand[0].imagepth);
    photo.setAttribute("width", "80%");
    photo.setAttribute("alt", "Picture of City");
    cardHeader.appendChild(photo);

    
    //computer display
    var cardHeader = document.getElementById("computer-city-header");
    var computerCityName = document.createElement('h3');
    computerCityName.innerText = this.computerHand[0].name;

    while (cardHeader.hasChildNodes()) {
         cardHeader.removeChild(cardHeader.firstChild);
     }

    cardHeader.appendChild(computerCityName); 

    var cardHeader = document.querySelector(".computer-city-image");
    var photo = document.createElement("IMG");
    photo.setAttribute("src", this.computerHand[0].imagepth);
    photo.setAttribute("width", "80%");
    photo.setAttribute("alt", "Picture of City");
    cardHeader.appendChild(photo);
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


    var playerTemp = document.getElementById("play-temp");
    var playerWind = document.getElementById("play-wind");
    var playerHumid = document.getElementById("play-humidity");
    var playerDaylight = document.getElementById("play-daylight");


    var tempLi = document.createElement('li');
    var windLi = document.createElement('li');
    var humidLi = document.createElement('li');
    var dayLi = document.createElement('li');



    tempLi.innerText = "Temperature: " + temp + " C";
    windLi.innerText = "Wind: " + wind + " m/s";
    humidLi.innerText = "Humidity: " + humidity + " %";
    dayLi.innerText = "Daylight: " + daylight + " hours";


    playerTemp.appendChild(tempLi);
    playerWind.appendChild(windLi);
    playerHumid.appendChild(humidLi);
    playerDaylight.appendChild(dayLi);

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
    
  /////////////////////////////////////////////////////////////
    var computerTemp = document.getElementById("comp-temp");
    var computerWind = document.getElementById("comp-wind");
    var computerHumid = document.getElementById("comp-humidity");
    var computerDaylight = document.getElementById("comp-daylight");


    var tempLi = document.getElementById('cTempLi');
    var windLi = document.getElementById('cWindLi');
    var humidLi = document.getElementById('cHumidLi');
    var dayLi = document.getElementById('cDayLi');


    tempLi.innerText = "Temperature: " + temp + " C";
    windLi.innerText = "Wind: " + wind + " m/s";
    humidLi.innerText = "Humidity: " + humidity + " %";
    dayLi.innerText = "Daylight: " + daylight + " hours";


    computerTemp.appendChild(tempLi);
    computerWind.appendChild(windLi);
    computerHumid.appendChild(humidLi);
    computerDaylight.appendChild(dayLi);

  },

  getPlayerFlightInfo:  function(data){

    var price = data.Dates.OutboundDates[0].Price; 
    this.playerHand[0].price = price;
    var playerPrice = document.getElementById("play-flight");
    var PriceLi = document.createElement('li');
    PriceLi.innerText = "Flight from London: £" + price;
    playerPrice.appendChild(PriceLi);
  },

  getComputerFlightInfo:  function(data){

    var price = data.Dates.OutboundDates[0].Price;
    this.computerHand[0].price = price;
    var computerPrice = document.getElementById("comp-flight");
    var PriceLi = document.createElement('li');
    PriceLi.innerText = "Flight from London: £" + price;
    computerPrice.appendChild(PriceLi);
  },

  displayPlayerInfo: function(){
    playerTemp = document.getElementById("play-temp");
    playerWind = document.getElementById("play-wind");


    playerTemp.innerText = "Temperature: " + playerHand[0].temp;
    playerWind.innerText = "Wind: " + playerHand[0].wind;
  },

  displayComputerInfo: function(){
    computerTemp = document.getElementById("comp-temp");
    computerWind = document.getElementById("comp-wind");

    computerTemp.innerText = "Temperature: " + computerHand[0].temp;
    computerWind.innerText = "Wind: " + computerHand[0].wind;
  },

  resetColour: function(){  //really doesn't belong here!
    document.getElementById('play-temp').style.backgroundColor = "ivory";
    document.getElementById('play-wind').style.backgroundColor = "ivory";
    document.getElementById('play-humidity').style.backgroundColor = "ivory";
    document.getElementById('play-daylight').style.backgroundColor = "ivory";
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