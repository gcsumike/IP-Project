angular.module('userApp',['appRoutes', 'userControllers', 'userServices', 'authServices', 'ngAnimate', 'mainController'])
.config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
}]);

