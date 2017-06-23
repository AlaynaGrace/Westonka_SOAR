googleAuthApp.controller('adminController', ['$http', '$scope', '$timeout', 'PDFService', function($http, $scope, $timeout, PDFService) {
  console.log('inside admin controller');
  var vm = this;

  //start get slips for grades one and two
  vm.gradesKThroughTwo = function() {
    console.log('hitting k through two');
    return $http({
      method: 'GET',
      url: "/admin/" + "('k-1', 'k-2', '1-1', '1-2', '2-1', '2-2')"
    }).then(function(response) {
      vm.kThroughTwo = response.data;
      console.log('inside the then k-2');
      console.log('response k-2: ', response);
    });
  }; //end get slips for grades one and two
  // vm.gradesKThroughTwo();

  //start get slips for three and four
  vm.gradesThreeAndFour = function() {
    console.log('hitting three and four');
    return $http({
      method: 'GET',
      url: "/admin/" + "('3-1', '3-1', '4-1', '4-2')"
    }).then(function(response) {
      vm.threeAndFour = response.data;
      console.log('response 3-4: ', response);
    });
  }; //end get slips for three and four

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

// get for random winner based on grade group
vm.getRandom = function() {
  console.log('hittin in get random');
  $http({
    method: 'GET',
    url: '/random'
  }).then(function(response){
    vm.getRan = response.data;
  });
};



  vm.clickKTwo = function() {
    vm.gradesKThroughTwo().then(function(response) {
      //need if statement to make sure it shows the correct grade group
      for (var i = 0; i < vm.kThroughTwo.length; i++) {
        console.log('inside loop click k two');
      }
    });
  };

  vm.clickThreeFour = function() {
    vm.gradesThreeAndFour().then(function(response){
      //need if statement to make sure it shows the correct grade group
      for (var i = 0; i<vm.threeAndFour.length; i++){
        console.log('inside loop click three four');
      }
    });
  };

  vm.makePDF = function() {
    PDFService.makeNewPDF();
  };

  vm.groupRandomWinner = function() {
    console.log('inside group random winner button');
    vm.gradesKThroughTwo().then(function(response){
      vm.getRan = (Math.floor(Math.random() * vm.kThroughTwo.length) + 1);
      console.log('get ran: ', vm.getRan);
    });
  };//end group random winner


}]);
