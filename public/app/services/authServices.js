
//purpose: user authentication

angular.module('authServices',[])

	.factory('Auth', function($http, $q, AuthToken){
			authFactory = {};
			
			
			authFactory.login = function(loginData){
				
				return $http.post('/api/authenticate', loginData).then(function(data){
					//get the token
					AuthToken.setToken(data.data.token);
					return data;
				});
			}
			//Auth.isLoggedIn()
			authFactory.isLoggedIn = function(){
				console.log(AuthToken.getToken());
				if(AuthToken.getToken()){
					return true;
				} else {
					return false;
				}
			}
			//Auth.getUser()
			authFactory.getUser = function($q){
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

	.factory('AuthToken', function($window){
		var authTokenFactory = {};

		// AuthToken.setToken(token);
		authTokenFactory.setToken = function(token){
			if(token){
				$window.localStorage.setItem('token', token);
			} else {
				$window.localStorage.removeItem('token');
			}
		}

		// AuthToken.getToken();
		authTokenFactory.getToken = function(){
			return $window.localStorage.getItem('token');
		}

		return authTokenFactory;
	})

	.factory('AuthInterceptor', function(AuthToken){
		var authInterceptorFactory = {};

		authInterceptorFactory.request = function(config){
			var token = AuthToken.getToken();
			
			//assigning token to headers
			if(token) config.headers['x-access-token'] = token;

			return config;
		}
		
		return authInterceptorFactory;
	});