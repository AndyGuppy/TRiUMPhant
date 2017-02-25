var Card = function(dbOptions){
  this.name = dbOptions.name;
  this.imagepth = dbOptions.imagepth;
  this.skycode = dbOptions.skycode;
  this.temp = {};
  this.wind = {};
  this.humidity = {};
  this.daylight = {};


}

Card.prototype = {
   
}

module.exports = Card;

