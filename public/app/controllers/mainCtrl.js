angular.module('mainController',['authServices'])

.controller('mainCtrl', function($http, $timeout, $location, Auth, $rootScope){
	var app = this;

	app.loadMe = false;


	$rootScope.$on('$routeChangeStart', function(){


		//check if user is logged in
		if(Auth.isLoggedIn()){
			app.isLoggedIn = true;
			Auth.getUser().then(function(data){
				console.log(data.data.username);
				app.username = data.data.username;
				app.useremail = data.data.email;
				app.loadMe = true;
			});
		} else {
			app.isLoggedIn = false;
			app.username = '';
		}
	});
	

	this.doLogin = function(loginData){
		app.errorMsg = false;
		app.loading = true;

		Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				app.loading = false;
				app.successMsg = data.data.message = '...Redirecting to home';
				$timeout(function(){
					$location.path('/');
					app.loginData = '';
					app.successMsg = '';
				}, 1000);
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
			$location.path('/');
		}, 2000);
	}
	

});



