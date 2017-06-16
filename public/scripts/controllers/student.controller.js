myApp.controller('userController', ['$http','$scope','$timeout', '$mdSidenav', 'getService', function($http, $scope, $timeout, $mdSidenav, getService){

  var vm = this;
//start get student slips
  vm.getStudentSlips = function() {
    $http({
      method: 'GET',
      url:'/student'
    }).then(function(response){
      vm.studentSlips = response.data;
    });
  };//end of getStudentList


}]);
