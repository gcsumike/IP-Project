angular.module('contactServices', [])
	.factory('Msg', function($http){
		msgFactory = {};
		
		
		msgFactory.sendMsg = function(conData){
			console.log(" in sendMsg() ");
			console.log(conData);
			return $http.post('/api/contact', conData);
		}
		
		
		return msgFactory;
	});