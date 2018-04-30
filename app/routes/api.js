
var User = require('../models/user'); //require the User schema created in user.js, so we can use it here
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken'); //json web tokens to keep user logged in
var secret = 'clizby';


//module.exports is importing the following routes into the server file
//router will return return the route to the server after it is accessed here
module.exports = function(router) {
	
	
	//sending user data....
	router.get('/users', function(req, res){
		var user = new User();
		
		User.find().select('username').exec(function(err, user){			
			res.json(user);
		})
		
	});

	
	
	
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
		User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.json({ success: false, message: 'Could not authenticate user'});
			} else if (user){		
			
				if(req.body.password){
					var validPassword = user.comparePassword(req.body.password);
					if(!validPassword){
					res.json({success: false, message: 'Could not authenticate password'});
					} else {
						var token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'});
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

	router.post('/me', function(req,res){
		res.send(req.decoded);
	})
	
	
	return router; //return route to server
};






