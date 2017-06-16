myApp.controller('userController', ['$http','$scope','$timeout', '$mdSidenav', 'getService', function($http, $scope, $timeout, $mdSidenav, getService){

  var vm = this;
//start get slips for grades one and two
  vm.gradesOneAndTwo = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.oneAndTwo = response.data;
    });
  };//end get slips for grades one and two

  var vm = this;
//start get slips for three and four
  vm.gradesThreeAndFour = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.threeAndFour = response.data;
    });
  };//end get slips for three and four

  var vm = this;
  //start get all slips for all grades
  vm.getAllSlipsForAllGrades = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.allSlips = response.data;
    });
  };//end of get all slips for all grades

  var vm = this;
  //start get incentive
  vm.getIncentive = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.incentive = response.data;
    });
  };//end get incentive






}]);
