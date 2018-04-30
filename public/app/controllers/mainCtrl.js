angular.module('mainController',['authServices'])

.controller('mainCtrl', function($http,$window, $timeout, $location, Auth){
	var app = this;
	
	if(Auth.isLoggedIn()){
		console.log("user is logged in");
		Auth.getUser().then(function(data){
			console.log(data.data.username);
			
			app.username = data.data.username;
		});
	} else {
		console.log("user is not logged in");
	}

	this.doLogin = function(loginData){
		app.errorMsg = false;
		app.loading = true;

		Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				app.loading = false;
				app.successMsg = data.data.message = '...Redirecting to home';
				$timeout(function(){
					$window.location.href = '/'
				}, 2000);
			} else{
				app.loading = false;
				app.errorMsg = data.data.message;

			}
		});
	}

	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$window.location.href = '/'
			
		}, 2000);
	}
	

});


