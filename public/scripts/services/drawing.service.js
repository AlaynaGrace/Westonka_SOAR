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
    return $http({
      url: '/private/teacher/random/' + homeroom,
      method: 'GET'
    }).then(function success(response){
      console.log(response);
    }, function failure(response){
      console.log(response);
    });
  };

}]);
