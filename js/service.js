angular.module('wordPressApp')
    .factory('pressListServ', function($http) {
	  var json = {
	    async: function() {
	      // $http returns a promise, which has a then function, which also returns a promise
	      var promise = $http.get('http://localhost/codeigniter/index.php/api/example/all').then(function (response) {
	        return response.data;
	      });
	      // Return the promise to the controller
	      return promise;
	    }
	  };
	  return json;
	})

	.factory('navBarServ', function($http) {
	    var json = {
	        async: function() {
	          // $http returns a promise, which has a then function, which also returns a promise
	        	var promise = $http.get('http://localhost/codeigniter/index.php/api/example/viewpresstitle').then(function (response) {
	        		return response.data;
	      		});
	      // Return the promise to the controller
	      	return promise;
	    	}
	    };
	return json;
	})






