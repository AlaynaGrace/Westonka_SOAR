googleAuthApp.service('EmailSearchService',['$http', function($http){
  var self = this;

  self.findEmail = function(email){
      return $http({
        url: '/private/admin/findEmail/' + email,
        method: 'GET'
      }).then(function success(response){
        console.log(response);
        return response.data;
      }, function failure(response){
        console.log(response);
      });
  };

}]);
