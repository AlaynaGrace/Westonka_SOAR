googleAuthApp.controller('uploadController', ['$http', 'CSVUploadService', function($http, CSVUploadService){
  var vm = this;

  vm.dropTables = function(){
      if(confirm('ARE YOU SURE YOU WANT TO DROP ALL CURRENT TABLES? YOU WILL NOT BE ABLE TO GET ANY OF THE DATA BACK')){
        console.log('You dropped all the tables');
        $http({
          url: '/private/admin/dropTables',
          method: 'DELETE'
        }).then(function success(response){
          console.log('You have successfully dropped all tables');
          alert('You have successfully dropped all tables');
        }, function failure(response){
          console.log(response);
          alert('There was an error dropping the tables');
        });
      }
  };

  vm.createTables = function(){
    $http({
      url: '/private/admin/createTables',
      method: 'POST'
    }).then(function success(response){
      console.log(response);
    }, function failure(response){
      console.log(response);
    });
  };

  var reader;


  function abortRead() {
    reader.abort();
  }

  function errorHandler(fileEvent) {
    switch(fileEvent.target.error.code) {
      case fileEvent.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case fileEvent.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case fileEvent.target.error.ABORT_ERR:
        break;
      default:
        alert('An error occurred reading this file.');
   }
 }


 function handleFileSelect(fileEvent) {

   reader = new FileReader();
   reader.onerror = errorHandler;
   reader.onabort = function(readerEvent) {
     alert('File read cancelled');
   };
   reader.onloadstart = function(readerEvent) {
    //  document.getElementById('progress_bar').className = 'loading';
    console.log('Onload start');
   };
   reader.onload = function(readerEvent) {
     console.log('the file has been loaded');
     // sends read file to service function
     CSVUploadService.uploadCSV(readerEvent.target.result);
   };

   // Read in the file as a text string.
   reader.readAsText(fileEvent.target.files[0]);
 }

 document.getElementById('files').addEventListener('change', handleFileSelect, false);
 document.getElementById('homeroomFiles').addEventListener('change', handleFileSelect, false);

}]);
