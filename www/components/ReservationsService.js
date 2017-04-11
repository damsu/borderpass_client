angular.module('ReservationsService', []).factory('Reservations', function($q, $http){
	var reservationID;
  var reservations;
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
        },

    getReservationByID: function(id)
    {
            return $q(function(resolve, reject)
            {
                $http.get("https://border-pass-server.herokuapp.com/" + "reservations/id/" + id).then(function(response)
                {
                    reservations = response.data;
                    console.log("ID to look for : " + id);
                    console.log("reservations for that id : " + reservations);
                    resolve(reservations);
                },
                function(err)
                {
                    reject();
                });
            });
      }
    }

});
