googleAuthApp.controller('studentController', ['$http','$scope','$timeout', function($http, $scope, $timeout){
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


}]);
