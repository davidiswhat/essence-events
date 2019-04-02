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

    getAll: function () {
      console.log("getting all accounts");
      return $http.get('/api/authenticate/all');
    },

    delete: function (userid) {
      console.log("deleting ", userid);
      return $http.post("/api/authenticate/delete", {"userid": userid});
    },

    getAccountInfo: function() {
      return $http.get('/api/authenticate/info');
    },

    checkLogIn: function() {

      return $http.get('/api/authenticate/status');
    },
    
    logOut : function() {
      return $http.get("/api/authenticate/logout");
    }
  };
    
  return methods;
});
