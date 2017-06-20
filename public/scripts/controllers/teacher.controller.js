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
});//end myApp
