angular.module('userApp',['appRoutes', 'userControllers', 'userServices', 'contactControllers', 'contactServices', 'authServices', 'ngAnimate', 'mainController'])
.config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
}]);

