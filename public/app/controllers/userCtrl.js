angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User){

	var app = this; //for creating variables
	
	this.regUser = function(regData){
		app.errorMsg = false; //holds an error msg
		app.loading = true; //used to animate loading screen for user

		//calls create() from userServices sending the data to be inserted into DB
		User.create(app.regData).then(function(data){
			
			//if successfully added the user stop loading and send success msg
			if(data.data.success){
				app.loading = false;
				app.successMsg = data.data.message = '...Redirecting to home';
				//wait alittle
				$timeout(function(){
					$location.path('/'); //redirect to the home index
				}, 1000);
			} else{
				app.loading = false;
				app.errorMsg = data.data.message;

			}
		});
	}
	
	
	
	
});
