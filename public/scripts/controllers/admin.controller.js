googleAuthApp.controller('adminController', ['$http','$scope','$timeout', 'PDFService', function($http, $scope, $timeout, PDFService){
console.log('');
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

  // var vm = this;
//start get slips for three and four
  vm.gradesThreeAndFour = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.threeAndFour = response.data;
    });
  };//end get slips for three and four

  // var vm = this;
  //start get all slips for all grades
  vm.getAllSlipsForAllGrades = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.allSlips = response.data;
    });
  };//end of get all slips for all grades

  // var vm = this;
  //start post incentive
  vm.postIncentive = function() {
    $http({
      method: 'POST',
      url:'/admin'
    }).then(function(response){
      vm.incentive = response.data;
    });
  };//end post incentive


  // var vm = this;
  //start get incentive
  vm.getIncentive = function() {
    $http({
      method: 'GET',
      url:'/admin'
    }).then(function(response){
      vm.incentive = response.data;
    });
  };//end get incentive

  vm.makePDF = function(){
    PDFService.makeNewPDF();
  };






}]);
