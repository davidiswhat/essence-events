var lastError = undefined;
angular.module('accounts').controller('AdminController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    $scope.getAllAccounts = function () {
      console.log("updating accounts");
      Accounts.getAllAccounts().then(function(response) {
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

    $scope.getAllTransactions = function () {
      console.log("getting all transactions");
      Accounts.getAllTransactions().then(function(response) {
        $scope.transactions = response.data;
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

    $scope.getAllAccounts();

    $scope.getAllTransactions();

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
        $scope.getAllAccounts();
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
        $scope.getAllAccounts();
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
         $scope.getAllAccounts();
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
          $scope.getAllAccounts();
        });
      }
    };

    
    $scope.rejectCharge = function (chargeid) {
      if (confirm("Are you sure you want to reject this transaction?"))
      {
        console.log("deleting", chargeid);
        result = Accounts.deleteCharge(null, 0, chargeid).then(function(response) {
          //refreshing
          $scope.getAllTransactions();
        });

      }
    };

    $scope.logout = function() {
      console.log("Attempting to Log out");
      Accounts.logOut().then( function(result) {
        window.location.replace("/index.html");
      },
      function (error) {
        window.location.replace("/index.html");
      });
    };

    $scope.approveCharge = function (userId, amount, chargeid) {
      if (confirm("Are you sure you want to approve this transaction and update the user's account?"))
      {
        console.log("deleting", chargeid);
        result = Accounts.deleteCharge(userId, amount, chargeid).then(function(response) {
          $scope.getAllAccounts();
          //refreshing
          $scope.getAllTransactions();
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