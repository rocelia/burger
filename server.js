var express = require("express");
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var connection = require('./config/connection');
var apiRoutes = require('./config/orm');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res){
  connection.query('SELECT * FROM burgers', function(err, results){
    console.log(results);

    res.render('index', {burgers: results});
  });
});

app.use('/', apiRoutes);

var port = process.env.PORT || 3000
app.listen(port);