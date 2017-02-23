var express = require('express');
var app = express(); // initialise the express
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./controllers'));

app.use(express.static('client/build'));
app.use(express.static('client/public'));

app.listen(3000, function () {
  console.log('Trumped running on '+this.address() +' at port ' + this.address().port);
});
