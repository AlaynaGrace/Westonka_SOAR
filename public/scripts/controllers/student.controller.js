googleAuthApp.controller('studentController', ['$http','$scope','$timeout', 'AuthFactory',function($http, $scope, $timeout, AuthFactory){
console.log('this is the studentController');
  var vm = this;
  var authFactory = AuthFactory;

  authFactory.isLoggedIn()
  .then(function (response) {
    if (response.data.status) {
      vm.displayLogout = true;
      authFactory.setLoggedIn(true);
      console.log(response.data);
      vm.username = response.data.name;
      vm.email = response.data.email;
      vm.id = response.data.id;
      // vm.homeroom = response.data.homeroom_id;
    } else { // is not logged in on server
      vm.displayLogout = false;
      authFactory.setLoggedIn(false);
    }
  },

  function () {
    vm.message.text = 'Unable to properly authenticate user';
    vm.message.type = 'error';
  });

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
        url: '/student/check/' + vm.slipKey,
        method: 'GET'
      }).then(function success(response){
        console.log('This is the response',response.data);
        if(response.data.isNotUsed){
          var objectToSend = {
            slip_number: vm.slipKey,
            s: vm.s,
            o: vm.o,
            a: vm.a,
            r: vm.r,
            student_id: vm.id,
            date_entered: new Date()
          };

          $http({
            method: 'POST',
            url:'/student',
            data: objectToSend
          }).then(function success(response){
            console.log(response);
            vm.slipKey = '';
            vm.s = false;
            vm.o = false;
            vm.a = false;
            vm.r = false;

          }, function failure(response){
            console.log(response);
          });
        }
        else{
          //Make this into an alert or a message
          console.log('Try again! Slip was already used!');
        }
      }, function failure(response){
        console.log(response);
      });

    };//end of postStudentSlip
}]);
