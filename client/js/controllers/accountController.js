angular.module('accounts').controller('AccountsController', ['$scope', 'Accounts', 
  function($scope, Accounts) {

    $scope.createAccount = function() {
      console.log("test1");
      result = Accounts.createAccount($scope.newAccount);

      console.log(result);
    };

  }
]);