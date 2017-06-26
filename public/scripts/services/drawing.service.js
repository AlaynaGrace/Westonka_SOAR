googleAuthApp.service('DrawingService', ['$http',function($http){
  var self = this;

  self.grabRandomSlipsAll = function(){
    return $http({
      url: '/private/admin/random',
      method: 'GET'
    }).then(function success(response){
      console.log(response);
    }, function failure(response){
      console.log(response);
    });
  };

  self.grabRandomSlipsHomeroom = function(homeroom){
    console.log('hit grabRandomSlipsHomeroom');
    return  $http({
      url: '/private/teacher/random/' + homeroom,
      method: 'GET'
    }).then(function success(response){
      console.log('random slips by homeroom',response.data);
      return response;
    });
  };
  //   function failure(response){
  //     console.log(response);
  //   });
  // };


}]);
