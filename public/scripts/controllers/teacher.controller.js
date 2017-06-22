googleAuthApp.controller('teacherController', ['$http','AuthFactory',function($http, AuthFactory){
console.log('teacher');
var vm = this;

AuthFactory.isLoggedIn()
.then(function (response) {
  if (response.data.status) {
    vm.displayLogout = true;
    AuthFactory.setLoggedIn(true);
    console.log(response.data);
    vm.username = response.data.name;
    vm.email = response.data.email;
    vm.id = response.data.id;
    vm.homeroom = response.data.homeroom_id;
  } else { // is not logged in on server
    vm.displayLogout = false;
    AuthFactory.setLoggedIn(false);
  }
},

function () {
  vm.message.text = 'Unable to properly authenticate user';
  vm.message.type = 'error';
});

//start getStudentList
vm.getStudentList = function() {
  $http({
    method: 'GET',
    url:'/teacher'
  }).then(function(response){
    vm.studentArray = response.data;
  });
};//end of getStudentList

}]);//end myApp
