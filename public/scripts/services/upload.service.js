googleAuthApp.service('CSVUploadService', ['$http', function($http){
  var self = this;
  self.objectToSend = {fileContent: []};
  self.uploadCSV = function(csv) {
    if(self.objectToSend.fileContent.length < 1){
      console.log('this is what self.objectToSend.fileContent looks like:', self.objectToSend.fileContent);
      self.objectToSend.fileContent.push(csv);
    }
    else{
      self.objectToSend.fileContent.push(csv);

      console.log('finally sending everything');
      $http({
        url: 'private/admin/upload',
        data: self.objectToSend,
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
