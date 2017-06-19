googleAuthApp.controller('AuthController', function (AuthFactory) {
console.log('this is the the AuthController');
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
});
