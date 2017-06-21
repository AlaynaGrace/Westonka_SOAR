googleAuthApp.controller('studentController', ['$http','$scope','$timeout', 'AuthFactory',function($http, $scope, $timeout, AuthFactory){
console.log('this is the studentController');
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

  //start post student slips
    vm.postStudentSlip = function() {
      $http({
        method: 'POST',
        url:'/student'
      }).then(function(response){
        vm.studentSlip = response.data;
      });
    };//end of postStudentSlip
    
}]);
