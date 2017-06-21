googleAuthApp.controller('adminController', ['$http', '$scope', '$timeout', 'PDFService', function($http, $scope, $timeout, PDFService) {
  console.log('inside admin controller');
  var vm = this;
  //start get slips for grades one and two
  vm.gradesKThroughTwo = function() {
    console.log('hitting k through two');
    return $http({
      method: 'GET',
      url: '/admin'
    }).then(function(response) {
      vm.kThroughTwo = response.data;
      console.log('inside the then k-2');
      console.log('response: ', response);
    });
    // console.log(response.data);
  }; //end get slips for grades one and two
  // vm.gradesKThroughTwo();


  // var vm = this;
  //start get slips for three and four
  vm.gradesThreeAndFour = function() {
    console.log('hitting three and four');
    return $http({
      method: 'GET',
      url: '/admin'
    }).then(function(response) {
      vm.threeAndFour = response.data;
    });
  }; //end get slips for three and four

  // var vm = this;
  //start get all slips for all grades
  vm.getAllSlipsForAllGrades = function() {
    console.log('hitting all slips for all grades');
    $http({
      method: 'GET',
      url: '/admin'
    }).then(function(response) {
      vm.allSlips = response.data;
    });
  }; //end of get all slips for all grades

  // var vm = this;
  //start post incentive
  vm.postIncentive = function() {
    console.log('hitting post inscentive');
    $http({
      method: 'POST',
      url: '/admin'
    }).then(function(response) {
      vm.incentive = response.data;
    });
  }; //end post incentive


  // var vm = this;
  //start get incentive
  vm.getIncentive = function() {
    console.log('hitting get incentive');
    $http({
      method: 'GET',
      url: '/admin'
    }).then(function(response) {
      vm.incentive = response.data;
    });
  }; //end get incentive

  vm.clickKTwo = function() {
    vm.gradesKThroughTwo().then(function(response) {
      for (var i = 0; i < vm.kThroughTwo.length; i++) {
        console.log('inside loop click k two');
      }
    });
  };


  vm.clickThreeFour = function() {
    vm.gradesThreeAndFour().then(function(response){
      for (var i = 0; i<vm.threeAndFour.length; i++){
        console.log('inside loop click three four');
      }
    });
  };

  vm.makePDF = function() {
    PDFService.makeNewPDF();
  };



}]);
