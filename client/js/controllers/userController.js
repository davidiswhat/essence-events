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

    $scope.changeName = function() {
      //can easily create variables from prompts
      //in the prompt, the first string is the text of the prompt, and the second string is the placeholder name
      var newName = prompt("Change Name", $scope.userinfo.fullName);
      console.log("(User Controller) changing name to: " + newName);
      $scope.userinfo.fullName = newName;
      Accounts.update($scope.userinfo).then(
        function() {          
          Accounts.getAccountInfo().then(
            function (result) {
              console.log("received info");
              console.log(result);
              $scope.userinfo = result.data;
            },
            function (err) {
              console.log("redirecting");
              window.location.replace("/LogIn.html");
              console.log(err);
            }
          );
        }
      );
    };

    $scope.changeNumber = function() {
      //can easily create variables from prompts
      //in the prompt, the first string is the text of the prompt, and the second string is the placeholder name
      var newNum = prompt("Change Number", $scope.userinfo.phoneNum);
      console.log("(User Controller) changing number to: " + newNum);
      $scope.userinfo.phoneNum = newNum;
      Accounts.update($scope.userinfo).then(
        function() {          
          Accounts.getAccountInfo().then(
            function (result) {
              console.log("received info");
              console.log(result);
              $scope.userinfo = result.data;
            },
            function (err) {
              console.log("redirecting");
              window.location.replace("/LogIn.html");
              console.log(err);
            }
          );
        }
      );
    };

    $scope.changePassword = function() {
      //can easily create variables from prompts
      //in the prompt, the first string is the text of the prompt, and the second string is the placeholder name
      var password = prompt("Enter current password");
      var newPassword = prompt("Enter new password");
      var newPasswordConf = prompt("Confirm new password");
      console.log("(User Controller) changing password to: " + newPassword);
      Accounts.updatePass({password: password, newPassword: newPassword, newPasswordConf}).then(
        function() {
              alert("Password change successful.");
            },
        function (err) {
          console.log(err);
          console.log(err.data);
          console.log(err.error);
          alert("Error: ", err.data.error);
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

