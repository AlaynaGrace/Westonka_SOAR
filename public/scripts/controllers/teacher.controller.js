
googleAuthApp.controller('teacherController', ['$http','AuthFactory', '$location', 'DrawingService', '$interval', '$timeout', function($http, AuthFactory, $location, DrawingService, $interval, $timeout){
console.log('teacher');
var vm = this;
var authFactory = AuthFactory;


AuthFactory.isLoggedIn()
.then(function (response) {
  if (response.data.status) {
    vm.displayLogout = true;
    AuthFactory.setLoggedIn(true);
    console.log('user response data',response.data);
    vm.username = response.data.name;
    vm.email = response.data.email;
    vm.id = response.data.id;
    vm.homeroom = response.data.homeroom_id;
    // vm.homeroom = '123';
    vm.getStudentList();

    vm.id = response.data.id;
    vm.homeroom = response.data.homeroom_id;
    if(response.data.admin !== true && response.data.teacher !== true){
      $location.path('/students');
    }
    else if(response.data.admin === true && response.data.teacher === true){
      vm.both=true;
      console.log('this is both:', vm.both);
    }
    else if(response.data.admin){
      $location.path('/admins');
    }

  } else { // is not logged in on server
    vm.displayLogout = false;
    AuthFactory.setLoggedIn(false);
  }
},

vm.getStudentList = function() {
  console.log('hit getStudentList');
  console.log('email in getStudentList', vm.email);
  var objectToSend = {
    email: vm.email,
    homeroom: vm.homeroom
  };
  vm.classSlipCount = 0;
  console.log(objectToSend);
  $http({
        method: 'POST',
        url:'/private/teacher',
        data: objectToSend
      }).then(function(response){
        console.log('this is response.data', response.data);
        vm.studentArray = [];
        vm.studentArray = response.data.sort(compare);
        for(var i=0; i<vm.studentArray.length;i++){
          vm.classSlipCount += parseInt(vm.studentArray[i].count);
        }
        console.log('this is studentArray',vm.studentArray);
      });
    });//end of getStudentList

    vm.getWinners = function(){
      vm.winner = '';
      console.log('hit getWinners');
      console.log('this is HR number', vm.homeroom);
      DrawingService.grabRandomSlipsHomeroom(vm.homeroom).then(function(data){
        console.log('This is the data gotten from grabRandomSlipsHomeroom', data.data);
        $interval(function(){
          var slipsArray = data.data;
          console.log('ARRAY of slips', data.data);
          var random = Math.floor((Math.random() * slipsArray.length) );
          vm.winner = slipsArray[random].name;
          console.log('WINNER IS', vm.winner);
      },100,50);
      $timeout(function(){
        swal({
          imageUrl: 'http://clipartix.com/wp-content/uploads/2016/04/Free-clip-art-congratulations-clipart-clipartbold.jpeg',
          text: vm.winner,
          title: 'Congratulations!'
        });
      },5000);
      });
    };

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}


}]);
