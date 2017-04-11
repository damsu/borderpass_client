angular.module('ReservationsService', []).factory('Reservations', function($q, $http){
	var reservationID;
	return {

		postReservation: function(crossing, traveller, vehicle)
        {
          console.log(crossing);
          console.log(traveller);
          console.log(vehicle);
            return $q(function(resolve, reject)
            {
                $http.post("https://border-pass-server.herokuapp.com/" + "reservations", {
                    crossing,
                    traveller,
                    vehicle
                }).then(function(response)
                {
                    reservationID = response.data;
                    console.log("new reservation id : " + reservationID)
                    resolve(reservationID);
                },
                function(err)
                {
                    reject();
                });
            });
        }
	  }

});
