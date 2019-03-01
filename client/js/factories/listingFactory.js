angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://evening-wave-30197.herokuapp.com/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('https://evening-wave-30197.herokuapp.com/api/listings', listing);
    }, 

    delete: function(id) {
    return $http.delete('https://evening-wave-30197.herokuapp.com/api/listings/' + id)

    }
  };

  return methods;
});
