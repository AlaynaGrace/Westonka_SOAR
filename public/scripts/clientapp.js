var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);
console.log("line2");
/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "registerController as rc"
    })
    .when('/teacher', {
      templateUrl: '/views/teacher.html',
      controller: "teacherController as tc"
    })
    .when('/admin', {
      templateUrl: '/views/admin.html',
      controller: "adminController as ac"
    })
    .when('/student', {
      templateUrl: '/views/student.html',
      controller: "studentController as sc"
    })
    .otherwise({
      redirectTo: '/login'
    });

}]);
