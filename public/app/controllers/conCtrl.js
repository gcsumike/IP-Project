angular.module('contactControllers',['contactServices'])

.controller('conCtrl', function($http, $timeout, $location, Msg){
	var app = this;
	
	//send data to the correct route from the contact form
	this.sendMsg = function(conData){
		app.errorMsg = false; //holds an error msg
		app.loading = true; //used to animate loading screen for user
		
		Msg.sendMsg(app.conData).then(function(data){
				console.log("sending message");
				console.log(data);
				
			//if successfully added the message stop loading and send success msg
			if(data.data.success){
				console.log("sending message: success");
				app.loading = false;
				app.successMsg = data.data.message = 'Message received...Redirecting';
				//wait alittle
				$timeout(function(){
					$location.path('/'); //redirect to the home index
				}, 2000);
			} else{
				console.log("sending message: failed");
				app.loading = false;
				app.errorMsg = data.data.message;
			}
			
		});
		
	
	}
		
		
});

