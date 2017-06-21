googleAuthApp.controller('teacherController', ['$http','$scope','$timeout', 'AuthFactory',function($http, $scope, $timeout, AuthFactory){
console.log('teacher');
var vm = this;
var authFactory = AuthFactory;
//start getStudentList
vm.getStudentList = function() {
  // $http({
  //   method: 'GET',
  //   url:'/teacher'
  // }).then(function(response){
  //   vm.studentArray = response.data;
  // });
  authFactory.isLoggedIn()
  .then(function (response) {
    if (response.data.status) {
      _this.displayLogout = true;
      authFactory.setLoggedIn(true);
      console.log('response from auth factory', response.data);
      _this.username = response.data.name;
    } else { // is not logged in on server
      _this.displayLogout = false;
      authFactory.setLoggedIn(false);
    }
  });
};//end of getStudentList




}]);//end myApp
// $http({
//   method: 'GET',
//   url:'/teacher'
// }).then(function(response){
//   vm.studentArray = response.data;
// });
