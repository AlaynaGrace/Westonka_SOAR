myApp.controller('userController', ['$http','$scope','$timeout', '$mdSidenav', 'getService', function($http, $scope, $timeout, $mdSidenav, getService){

var vm = this;

vm.getStudendList = function() {
  $http({
    method: 'GET',
    url:'/teacher'
  }).then(function(response){
    vm.studentArray = response.data;
  });
};//end of getStudendList






}]);//end myApp
