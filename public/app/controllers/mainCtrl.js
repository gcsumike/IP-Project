angular.module('mainController',['authServices'])

.controller('mainCtrl', function($http, $scope, $window, $timeout, $location, Auth){
	var app = this;
	
	
	$scope.loadProfile = function(index){
		
		var n = $scope.profiles.findIndex(item => item.username === index);

		app.profUser = $scope.profiles[n];
		
		if(app.profUser){
			$location.path('/otherProfile');
		}else{console.log("An unexpected error has occured")}
		
	}
	
	if(Auth.isLoggedIn()){
		console.log("user is logged in");
		Auth.getUser().then(function(data){
			
			app.username = data.data.username;
			app.email = data.data.email;
			app.msg = data.data.msg;
			$http({
				method: 'GET',
				url: '/api/users',
			}).then(function successCallback(response){
				$scope.profiles = response.data
			}, function errorCallback(response){
				$scope.profiles = []
		
				$scope.msg = 'Could not get user'
		
			})
			
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


