
googleAuthApp.controller('teacherController', ['$http','AuthFactory', '$location',function($http, AuthFactory, $location){
console.log('teacher');
var vm = this;
var authFactory = AuthFactory;
// vm.classInfoArray = [];


AuthFactory.isLoggedIn()
.then(function (response) {
  if (response.data.status) {
    vm.displayLogout = true;
    AuthFactory.setLoggedIn(true);
    console.log(response.data);
    vm.username = response.data.name;
    vm.email = response.data.email;
    vm.id = response.data.id;
    // vm.homeroom = response.data.homeroom;
    vm.homeroom = '123';
    vm.getStudentList();

    vm.id = response.data.id;
    vm.homeroom = response.data.homeroom_id;
    if(response.data.admin !== true && response.data.teacher !== true){
      $location.path('/students');
    }
    else if(response.data.admin && response.data.teacher){
      vm.both=true;
    }
    else if(response.data.admin){
      $location.path('/admins');
    }

  } else { // is not logged in on server
    vm.displayLogout = false;
    AuthFactory.setLoggedIn(false);
  }
},


//   vm.message.text = 'Unable to properly authenticate user';
//   vm.message.type = 'error';
// });




vm.getStudentList = function() {

  console.log('hit getStudentList');
  console.log('email in getStudentList', vm.email);
  var objectToSend = {
    email: vm.email,
    homeroom: vm.homeroom
  };
  console.log(objectToSend);
  $http({
        method: 'POST',
        url:'/private/teacher',
        data: objectToSend
      }).then(function(response){
        console.log('this is response.data', response.data);
        vm.studentArray = [];
        vm.studentArray = response.data;
        console.log('this is studentArray',vm.studentArray);
      });
    });//end of getStudentList
}]);
