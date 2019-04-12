angular.module('accounts', []).factory('Accounts', function($http) {
  var methods = {
	  createAccount: function(newAccount) {
	    return $http.post('/api/authenticate', newAccount);
    },

    update: function(acc) {
      return $http.post('/api/authenticate/update', acc);
      },

    updatePass: function(newstuff) {
      return $http.post('/api/authenticate/updatepass', newstuff);
    },

    logIn: function(Account) {
      
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

    approve: function(userid) {
      console.log("approving ", userid);
      return $http.post("/api/authenticate/approve", {"userid": userid});
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
