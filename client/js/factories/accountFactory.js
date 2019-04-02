angular.module('accounts', []).factory('Accounts', function($http) {
  var methods = {
	  createAccount: function(newAccount) {
    console.log("test2");
	  return $http.post('/api/authenticate', newAccount);
    },

    logIn: function(Account) {
      console.log("test4");
      
      return $http.post('/api/authenticate', Account);
    },

    
    getAccountInfo: function() {
      return $http.get('/api/authenticate/info');
    },

    checkLogIn: function() {

      return $http.get('/api/authenticate/status');
    }
  };

  return methods;
});