googleAuthApp.controller('teacherController',  function($http){
console.log('teacher');
var vm = this;
//start getStudentList
vm.getStudentList = function() {
  console.log('in getStudentList');
  $http({
    method: 'GET',
    url:'/teacher'
  }).then(function(response){
    console.log(response);
    // vm.studentArray = response.data;
  });
};//end of getStudentList






});//end myApp
