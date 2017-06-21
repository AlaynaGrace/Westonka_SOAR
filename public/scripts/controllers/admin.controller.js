googleAuthApp.controller('adminController', ['$http','$scope','$timeout', function($http, $scope, $timeout){
console.log('inside admin controller');
  var vm = this;
//start get slips for grades one and two
  vm.gradesKThoughTwo = function() {
    console.log('hitting k through two');
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.kThroughTwo = response.data;
    });
    console.log(response.data);
  };//end get slips for grades one and two

//start get slips for three and four
  vm.gradesThreeAndFour = function() {
    console.log('hitting three and four');
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.threeAndFour = response.data;
    });
  };//end get slips for three and four

  //start get all slips for all grades
  vm.getAllSlipsForAllGrades = function() {
    console.log('hitting all slips for all grades');
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.allSlips = response.data;
    });
  };//end of get all slips for all grades

  //start post incentive
  vm.postIncentive = function() {
    console.log('hitting post inscentive');
    $http({
      method: 'POST',
      url:'/admin'
    }).then(function(response){
      vm.incentive = response.data;
    });
  };//end post incentive

  //start get incentive
  vm.getIncentive = function() {
    console.log('hitting get incentive');
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.incentive = response.data;
    });
  };//end get incentive

vm.clickKTwo = function() {
  console.log('hitting for loop');
  for (var i=0; i<gradesKThoughTwo.length; i++) {
  append+= "<div> {{thing.name}} </div>";
}
};

vm.clickThreeFour = function(gradesThreeAndFour) {
  append+= "<div> {{thing.name}} <div>";
};





}]);
