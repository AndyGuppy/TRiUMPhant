var Card = function(dbOptions){
  this.name = dbOptions.name;
  this.imagepth = dbOptions.imagepth;
  this.skycode = dbOptions.skycode;
  this.flag = '/images/flags/' + dbOptions.flag;
  this.temp = {};
  this.wind = {};
  this.humidity = {};
  this.daylight = {};
  this.price = {};


}

Card.prototype = {
   
}

module.exports = Card;

