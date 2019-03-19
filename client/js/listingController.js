angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      console.log($scope.newListingLongitude)
      $scope.listings.push({
        'code': $scope.newListingCode, 
        'name' : $scope.newListingName, 
        //'coordinates.longitude' : $scope.newListingLongitude, 
        //'coordinates.latitude' : $scope.newListingLatitude, 
        'coordinates': {
          'latitude': $scope.newListingLongitude, 
          'longitude': $scope.newListingLatitude
        },
        'address' : $scope.newListingAddress,
      })
    };

    $scope.deleteListing = function(index) {
      $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(index) {
      $scope.code = index.code;
      $scope.name = index.name;
      if(index.coordinates != null){
        $scope.latitude = index.coordinates.latitude;
        $scope.longitude = index.coordinates.longitude;
      }
      else{
        $scope.latitude = "N/A";
        $scope.longitude = "N/A";
      }
      
      if(index.address != null){
        $scope.address = index.address;
      }
      else{
        $scope.address = "N/A";
      }
    };
  }
]);