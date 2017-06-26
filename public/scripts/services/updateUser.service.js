googleAuthApp.service('UpdateUserService',['$http', function($http){
  var self = this;

  self.updateUser = function(user, type){
    var objectToSend = {
      user: user,
      type: type
    };
      return $http({
        url: '/private/admin',
        method: 'PUT',
        data: objectToSend
      }).then(function success(response){
        console.log(response);
        return true;
      }, function failure(response){
        console.log(response);
      });
  };

}]);
