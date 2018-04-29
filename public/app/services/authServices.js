angular.module('authServices',[])

	.factory('Auth', function($http, AuthToken){
			authFactory = {};

			// User.create(regData);
			authFactory.login = function(loginData){
				return $http.post('/api/authenticate', loginData).then(function(data){
					console.log(data.data.token);
					AuthToken.setToken(data.data.token);
					return data;
				});
			}

			authFactory.isLoggedIn = function(){
				if(AuthToken.getToken()){
					return true;
				} else {
					return false;
				}
			}
			//Auth.getUser()
			authFactory.getUser = function(){
				if(AuthToken.getToken()){
					return $http.post('/api/me');
				} else {
					$q.reject({message: "user has no token"});
				}
			}

			//Auth.logout();
			authFactory.logout = function(){
				AuthToken.setToken();
			}

			return authFactory;
	})

	.factory('AuthToken', function(){
		var authTokenFactory = {};

		// AuthToken.setToken(token);
		authTokenFactory.setToken = function(token){
			if(token){
				localStorage.setItem('token', token);
			} else {
				localStorage.removeItem('token');
			}
		}

		// AuthToken.getToken();
		authTokenFactory.getToken = function($window){
			return localStorage.getItem('token');
		}

		return authTokenFactory;
	})

	.factory('AuthInterceptor', function(){
		var authInterceptorFactory = {};

		authInterceptorFactory.request = function(config){
			var token = AuthToken.getToken();

			return config;
		}



		return authInterceptorFactory;
	});