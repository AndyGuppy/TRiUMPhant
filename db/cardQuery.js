var MongoClient = require('mongodb').MongoClient;

var CardQuery = function(){
  this.url = 'mongodb://localhost:27017/trumps-cities';
};

CardQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if (db) {
        var collection = db.collection('cities'); 
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        }); 

      };

    });
  }
}

module.exports = CardQuery;