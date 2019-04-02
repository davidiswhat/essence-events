var lastError = undefined;
angular.module('accounts').controller('AccountsController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    $scope.createAccount = function() {
      console.log("test1");
      console.log($scope.newAccount);
      Accounts.createAccount($scope.newAccount).then(
        function(result){
          console.log("callback");
          console.log(result);
          alert("Account creation successful.");
          window.location.replace("/AccountManagement.html");
          return result;
        },
        function(error){
          console.log("error callback");
          lastError = error;
          console.log(error.data.error);
          alert(error.data.error);
          return error;
        }
      );

    };

    $scope.logIn = function() {
      console.log("test3");

      //var answer = Accounts.logIn($scope.Account);
      //console.log(answer);

       Accounts.logIn($scope.Account).then(
         function(result2){
           console.log("callback");
           //console.log(result2);
           alert("Logged In");
           window.location.replace("/AccountManagement.html");
           return result2;
         },
         function(error2){
           console.log("error callback");
           console.log(error2.statusText);
           alert("Log In Failed");
           return error2;
         }
       );
    };

    $scope.checkLogIn = function() {
      console.log("Checking Log in Status");

      //var answer = Accounts.logIn($scope.Account);
      //console.log(answer);
      Accounts.checkLogIn().then(
        function(result){
          console.log("true");
          $scope.loggedIn = true;
        },
        function(error){
         console.log("false");
         $scope.loggedIn = false;
        }
      );
    }();
  }
]);