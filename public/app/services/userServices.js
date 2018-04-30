angular.module('userServices', [])
	.factory('User', function($http){
		userFactory = {};

		// User.create(regData);
		userFactory.create = function(regData){
			return $http.post('/api/users', regData);
		}
		
		//get all users
		userFactory.getUsers = function() {
			return $http.get('/api/users');
		}
		return userFactory;
});

