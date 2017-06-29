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
    .when('/teacherSpins',{
      templateUrl: '/public/views/teacherSpin.html',
      controller: "teacherController as tc"
    })
    .when('/admins', {
      templateUrl: '/public/views/admin.html',
      controller: "adminController as ac"
    })
    .when('/adminSpins',{
      templateUrl: '/public/views/adminSpin.html',
      controller: "adminController as ac"
    })
    .when('/permissions',{
      templateUrl: 'public/views/permissions.html',
      controller:'adminController as ac'
    })
    .when('/redirect', {
      templateUrl: 'public/views/redirect.html'
    })
    .when('/students', {
      templateUrl: '/public/views/student.html',
      controller: "studentController as sc"
    })
    .when('/upload', {
      templateUrl: '/public/views/upload.html',
      controller: 'uploadController as uc'
    })
    .otherwise({
      redirectTo: '/login'
    });
},
]);
