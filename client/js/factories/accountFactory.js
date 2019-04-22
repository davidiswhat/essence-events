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

    getAllAccounts: function () {
      return $http.get('/api/authenticate/all');
    },

    getAllTransactions: function () {
      return $http.get('/api/charge/all');
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
    
    setBalance: function(userid, newBalance){
      console.log("setting balance",userid,newBalance);
      return $http.post("/api/authenticate/setBalance", {"userid": userid,"newBalance": newBalance});

    },

    logOut : function() {
      return $http.get("/api/authenticate/logout");
    },

    addCharge : function(email, username, userId, amount) {
      return $http.post("/api/charge/", {"email": email, "username": username, "userId": userId, "amount" : amount});
    },

    deleteCharge : function(userid, adjustment, chargeid) {
      return $http.post("/api/charge/delete", {"userid": userid, "adjustment": adjustment, "chargeid" : chargeid});
    }

  };
    
  return methods;
});
