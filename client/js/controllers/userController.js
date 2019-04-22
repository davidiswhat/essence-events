var lastError = undefined;
angular.module('accounts').controller('UserController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    Accounts.getAccountInfo().then(
      function (result) {
        console.log("received info");
        console.log(result);
        $scope.userinfo = result.data;
        if ($scope.userinfo.isAdmin) {
          window.location.replace("/Admin.html");
        }
      },
      function (err) {
        console.log("redirecting");
        window.location.replace("/LogIn.html");
        console.log(err);
      }
    );

    $scope.logout = function() {
      console.log("Attempting to Log out");
      Accounts.logOut().then( function(result) {
        window.location.replace("/index.html");
      },
      function (error) {
        window.location.replace("/index.html");
      });
    };

    $scope.deleteUser = function () {
      if (confirm("Are you sure you want to delete your account?"))
      {
        Accounts.delete($scope.userinfo._id).then(function(response) {
          console.log("deleted");
          console.log("refreshing");
          window.location.replace("/index.html");
        },
        function (error) {
          alert("Error: account could not be deleted at this time.");
        });
      }
    };

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

    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount:{
              value: $scope.userinfo.balance
            } 
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed. Your account balance will be adjusted shortly.'); 
          Accounts.addCharge($scope.userinfo.email, $scope.userinfo.fullName, $scope.userinfo._id, $scope.userinfo.balance).then(
            function(result){
              alert('Transaction completed. Your account balance will be adjusted shortly.');            
            },
            function(error){
               console.log("ERROR SENDING TO SERVER");

            }
          );
        });
      }
    }).render('#paypal-buttons');
  }
]);

