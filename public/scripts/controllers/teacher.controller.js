googleAuthApp.controller('teacherController', function(){
console.log('teacher');
var vm = this;
//start getStudentList
vm.getStudentList = function() {
  $http({
    method: 'GET',
    url:'/teacher'
  }).then(function(response){
    vm.studentArray = response.data;
  });
};//end of getStudentList

var notebooks = angular.module('notebooks', []);

notebooks.controller('teacherController', function() {
  vm.notebooks = [
    {"name": "Student",
     "slips": "10"},
     {"name": "Student",
     "slips": "10"},
     {"name": "Student",
     "slips": "10"},
     {"name": "Student",
     "slips": "10"},
     {"name": "Student",
     "slips": "10"},
     {"name": "Student",
     "slips": "10"},
     {"name": "Student",
     "slips": "10"},
  ];
  vm.orderList = "name";
});




});//end myApp
