var lastError = undefined;
angular.module('accounts').controller('AdminController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    $scope.getAll = function () {
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
    }

    $scope.getAll();

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
        $scope.getAll();
      });
    }
    
    $scope.addCharge = function(userId,currentBalance){
     var chargeAmount = prompt("Enter charge amount: ", 0);
     if (chargeAmount <= 0) {
       alert("Error: enter a positive value to charge the user.");
     }
     console.log("Charge successfully set.", chargeAmount);
     Accounts.setBalance(userId, currentBalance + Number(chargeAmount)).then(
       function(){
        console.log("Success!")
        //refreshing
        $scope.getAll();
      },
      function(error){
        console.log("Error!",error);
      }
     )
    }

    $scope.addPayment = function(userId,currentBalance){
      var chargeAmount = prompt("Enter payment amount: ", 0);
      if (chargeAmount <= 0) {
        alert("Error: enter a positive payment to confirm.");
      }
      console.log("Charge successfully set.", chargeAmount);
      Accounts.setBalance(userId, currentBalance - Number(chargeAmount)).then(
        function(){
         console.log("Success!")
         //refreshing
         $scope.getAll();
       },
       function(error){
         console.log("Error!",error);
       }
      )
     }

    $scope.deleteUser = function (userid) {
      if (confirm("Are you sure you want to delete this account?"))
      {
        result = Accounts.delete(userid).then(function(response) {
          //refreshing
          $scope.getAll();
        });
      }
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