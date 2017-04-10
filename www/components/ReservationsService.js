angular.module('CustomServices', []).factory('Reservations', function($q, $http){
	var borders;
	return {

		postReservation: function()
        {
            return $q(function(resolve, reject)
            {
                /*$http.get("https://border-pass-server.herokuapp.com/" + "borders").then(function(response)
                {
                    borders = response.data;
                    resolve();
                },
                function(err)
                {
                    reject();
                });*/
            });
        }
	}

});
