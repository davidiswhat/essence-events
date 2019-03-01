angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      result = Listings.create($scope.newListing).then(function(response) {
        Listings.getAll().then(function(response) {
          $scope.listings = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      });
      console.log(result);


    };

    $scope.deleteListing = function(id) {
      result = Listings.delete(id).then(function(response) {
        Listings.getAll().then(function(response) {
          $scope.listings = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      });
      console.log(result);
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);