var googleAuthApp = angular.module('theGoogles', ['ngRoute']);

googleAuthApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // $locationProvider.hashPrefix('');


$routeProvider
    .when('/login', {
      templateUrl: '/public/views/templates/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .when('/registers', {
      templateUrl: '/public/views/register.html',
      controller: "registerController as rc"
    })
    .when('/teachers', {
      templateUrl: '/public/views/teacher.html',
      controller: "teacherController as tc"
    })
    .when('/admins', {
      templateUrl: '/public/views/admin.html',
      controller: "adminController as ac"
    })
    .when('/students', {
      templateUrl: '/public/views/student.html',
      controller: "studentController"
    })
    .otherwise({
      redirectTo: '/login'
    });
},
]);
