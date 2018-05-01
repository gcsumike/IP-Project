
//angular appRoutes http requests are handled and the templete needed is passed 
angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$routeProvider

	.when('/',{
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/home',{
		templateUrl: 'app/views/pages/home.html'
		
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
		templateUrl: 'app/views/pages/users/login.html'
	})

	.when('/logout',{
		templateUrl: 'app/views/pages/users/logout.html'
	})
	
	.when('/profile',{
		templateUrl: 'app/views/pages/users/profile.html'
	})

	.when('/register',{
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})
	
	.when('/contact',{
		templateUrl: 'app/views/pages/contact.html',
	    controller: 'conCtrl',
	    controllerAs: 'contact'
	})
	

	.otherwise({redirectTo: '/'});


	$locationProvider.html5Mode({
		enabled: true,
		requirebase: false
	});

})