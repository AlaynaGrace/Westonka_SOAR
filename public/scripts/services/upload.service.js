googleAuthApp.service('CSVUploadService', ['$http', function($http){
  var self = this;
  self.objectToSend = {fileContent: []};
  self.uploadCSV = function(csv) {
    if(self.objectToSend.fileContent.length !== 2){
      self.objectToSend.fileContent.push(csv);
    }
    else{
      $http({
        url: 'private/admin/upload',
        data: objectToSend,
        method: 'POST'
      }).then(function success(response) {
        self.objectToSend.fileContent = [];
        console.log(response);
      }, function failure(response){
        console.log(response);
      });
    }
  };
}]);
