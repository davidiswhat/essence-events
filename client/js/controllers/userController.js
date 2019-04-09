var lastError = undefined;
angular.module('accounts').controller('UserController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

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

    $scope.changeName = function() {
      console.log("Attempting to change name (User Controller)");
      //can easily create variables from prompts
      //in the prompt, the first string is the text of the prompt, and the second string is the placeholder name
      var newName = prompt("Change Name", $scope.userinfo.fullName);
      console.log("(User Controller) changing name to: " + newName);
      

       Accounts.changeName($scope.Account);
    };
  }
]);