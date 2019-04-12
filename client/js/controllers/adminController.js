var lastError = undefined;
angular.module('accounts').controller('AdminController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    Accounts.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      if (error.data.error == "permission denied") {
        console.log('permission denied');
        window.location.replace("/AccountManagement.html");
      }
      else {
        console.log('Unable to retrieve information:', error);
      }
    });


    Accounts.getAccountInfo().then(
      function (result) {
        console.log("received info");
        console.log(result);
      },
      function (err) {
        console.log("redirecting");
        window.location.replace("/LogIn.html");
        console.log(err);
      }
    );

    $scope.approveUser = function (userid) {
      result = Accounts.approve(userid).then(function(response) {
        console.log("approving");
        console.log("refreshing");
        Accounts.getAll().then(function(response) {
          $scope.users = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      });
    }

    $scope.deleteUser = function (userid) {
      if (confirm("Are you sure you want to delete this account?"))
      {
        result = Accounts.delete(userid).then(function(response) {
          console.log("deleted");
          console.log("refreshing");
          Accounts.getAll().then(function(response) {
            $scope.users = response.data;
          }, function(error) {
            console.log('Unable to retrieve listings:', error);
          });
        });
      }
    };

    $scope.createAccount = function() {
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
    };
  }
]);