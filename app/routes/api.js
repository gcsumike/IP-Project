
var User = require('../models/user'); //require the User schema created in user.js, so we can use it here
var Msg = require('../models/message');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken'); //json web tokens to keep user logged in
var secret = 'clizby';


//module.exports is importing the following routes into the server file
//router will return return the route to the server after it is accessed here
module.exports = function(router) {
	
	
	
	//insert the message into the DB
	// /api/contact
	router.post('/contact', function(req, res){
		console.log(" posting message");
		var msg = new Msg(); //create new message to send
		
		//get data from req
		msg.firstName = req.body.firstName;
		msg.lastName = req.body.lastName;
		msg.email = req.body.email;
		msg.subject = req.body.subject;
		msg.message = req.body.message;
		//validate all data is there, subject is not required
		if(msg.firstName == null || msg.lastName == null || msg.email == null || msg.message == null){
			//send error message, fill all require fields 
			console.log(" fields missing");
			res.json({success: false, message: "Please fill out each required field."});
			
		}
		else{
			console.log(" attempting to save");
			//send data to mongoose
			msg.save(function(err){
				
				if(err){
					console.log(" failed saving");
					res.json({success: false, message: 'Sorry, message could not be sent.'});
				} else{
					console.log(" success saving");
					res.json({success: true, message: 'Message sent.'});
				}
				
			});
			
		}
				
	});
	
	//get all users data....
	router.get('/users', function(req, res){
		
		console.log("getting users");
		
		var user = new User();
		
		User.find().select('_id : 0, username email msg ').exec(function(err, user){			
			res.json(user);
		})
		
	});
	
	//update user information route
	router.post('/updateUser', function(req, res){
		console.log(req.body.username);
		console.log(req.body.email);
		var user = new User();
		
		var query = {username : req.body.username}
		
		User.update(query, {email : req.body.email, msg : req.body.msg}, function(err, numEffected){
			if(err) {
				res.json({success: false, message: 'An unexpected error has occured'});
			}
			else { 
				res.json({success: true, message: 'Profile updated.'})
				}
		});
		
	})
	

	// USER REGISTRATION ROUTE : https://localhost:8080/api/users
	router.post('/users',function(req,res){
	
		var user = new User(); //local instance of user object
		
		//get the user attributes from the request body
		user.email = req.body.email; 
		user.username = req.body.username;
		user.password = req.body.password;
		//
			
		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
			//if any of the attributes are not provided in the body send a error response to client
			res.json({success: false, message: 'Ensure username, email, and password were provided'});
		} 
		else{
			//save the user attributes to the Mongoose model 
			//this will store the document containing the user attributes in the User collection in the DB
			user.save(function(err){
				
				if(err){
					res.json({success: false, message: 'Username or email already exists'});
				} else{
					res.json({success: true, message: 'User Created'});
				}
				
			});
		}
	});

	// USER LOGIN ROUTE : https://localhost:8080/api/authenticate
	router.post('/authenticate', function(req,res){
		
		console.log("authenticating");
		User.findOne({username: req.body.username}).select('email username password msg').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.json({ success: false, message: 'Could not authenticate user'});
			} else if (user){		
			
				if(req.body.password){
					var validPassword = user.comparePassword(req.body.password);
					if(!validPassword){
					res.json({success: false, message: 'Could not authenticate password'});
					} else {
						var token = jwt.sign({ username: user.username, email: user.email, msg: user.msg }, secret, {expiresIn: '24h'});
						res.json({success: true, message: 'User authenticated', token: token});
					}					
				} else{
					res.json({success: false, message: 'No password provided'});
				}
				
				
			}
		})
	});


	router.use(function(req, res, next){
		//get token, can get the token from one of three locations, req, url, or headers
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			//validate that the token is real
			jwt.verify(token, secret, function(err, decoded){
				if(err) {
					res.json({success: false, message: "Token invalid"});
				} else {
					req.decoded = decoded;
					next();
				}
			})
		} else{
			res.json({success: false, message: "No token provided"});
		}
	})
	
	
	
	
	
	
	
	//get the currently logged in user 
	router.post('/me', function(req,res){
		res.send(req.decoded);
	})
	
	
	return router; //return route to server
};






