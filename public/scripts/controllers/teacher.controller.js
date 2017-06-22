googleAuthApp.controller('teacherController', ['$http','$scope','$timeout', 'AuthFactory',function($http, $scope, $timeout, AuthFactory){
console.log('teacher');
var vm = this;
var authFactory = AuthFactory;
vm.studentArray = [];


//start getStudentList
authFactory.isLoggedIn()
.then(function (response) {
  if (response.data) {
    vm.displayLogout = true;
    authFactory.setLoggedIn(true);
    console.log('this is response.data',response.data.email);
    vm.email = response.data.email;
    vm.getStudentList();
  } else { // is not logged in on server
    vm.displayLogout = false;
    authFactory.setLoggedIn(false);
  }
});


//hook this up to button on student page to get class list
vm.getStudentList = function() {
  console.log('hit getStudentList');
  console.log('email in getStudentList', vm.email);
  var objectToSend = {
    email: vm.email
  };
$http({
      method: 'POST',
      url:'/teacher',
      data: objectToSend
    }).then(function(response){
      console.log('response.data', response.data);
      vm.studentArray = response.data;
      console.log('this is studentArray',vm.studentArray);

    });
    };//end of getStudentList

}]);
