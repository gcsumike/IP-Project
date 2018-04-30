angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/home',{
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/contact',{
		templateUrl: 'app/views/pages/contact.html'
	})

	.when('/history',{
		templateUrl: 'app/views/pages/history.html'
	})

	.when('/newsletter',{
		templateUrl: 'app/views/pages/newsletter.html'
	})

	.when('/sermons',{
		templateUrl: 'app/views/pages/sermons.html'
	})

	.when('/login',{
		templateUrl: 'app/views/pages/users/login.html',
		authenticated: false
	})

	.when('/logout',{
		templateUrl: 'app/views/pages/users/logout.html',
		authenticated: true
	})

	.when('/profile',{
		templateUrl: 'app/views/pages/users/profile.html',
		authenticated: true
	})

	.when('/register',{
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register',
		authenticated: false
	})

	.otherwise({redirectTo: '/'});








	console.log("routes work");
})