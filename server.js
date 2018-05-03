/*
	Server.js
	Autors: Andrew Newmark, Michael New
	Date: ....
	Purpose: Node express server for the TMC website application
*/

//Packages
var express = require('express'); //express object
var app = express();
var morgan = require('morgan'); //request logger, outputs a log of requests sent to the server in the console
var mongoose = require('mongoose'); //mongo db handler
var router = express.Router();// route handler
var appRoutes = require('./app/routes/api')(router);//path to routes, api.js, (router) tells this to use the router object for routes
var bodyParser = require('body-parser');
var path = require('path');

 

//middle ware
app.use(morgan('dev'));
app.use(bodyParser.json());//parses body data into json
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);//route for backend requests

//variables
var port = process.env.PORT || 8080; //changed from 8080 for testing will need to be changed back later


//database connection using mongoose
mongoose.connect('mongodb://admin:gcsu2018@ds113700.mlab.com:13700/heroku_b8j8lq3g', function(err){
	if(err){
		console.log("Not connected to database: " + err);
	} else{
		console.log("Successfully connected to database");
	}
});

app.get('/users',function(req,res){
	res.redirect('/api/users');
});

//for any path not specifially handled in routes default to index.html
app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//listen on port
app.listen(port, function(){
	console.log("Server running on " + port);
});