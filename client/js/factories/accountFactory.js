angular.module('accounts', []).factory('Accounts', function($http) {
  var methods = {
	createAccount: function(newAccount) {
    console.log("test2");
	  return $http.post('/api/authenticate', newAccount);
    }
  };

  return methods;
});
