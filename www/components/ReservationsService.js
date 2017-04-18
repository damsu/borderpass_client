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
                $http.post("https://border-pass-server.herokuapp.com/" + "reservations", {crossing: crossing,
                  traveller: traveller, vehicle: vehicle}, {headers: {'Content-Type': 'application/json'}})
                  .then(function(response)
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

    getReservationByID: function (id) {
      return $q(function (resolve, reject) {
        $http.get("https://border-pass-server.herokuapp.com/" + "reservations/id/" + id).then(function (response) {
            reservations = response.data;
            resolve(reservations);
          },
          function (err) {
            reject();
          });
      });
    },
    saved_reservations: function() {
      console.log(reservations);
      var saved_reservations = reservations;
      return saved_reservations;
    },
  getReservationByDocument: function(country, documentType, reservationNumber)
  {
    return $q(function(resolve, reject)
            {
                $http.post("https://border-pass-server.herokuapp.com/" + "reservations/docNum", {country: country,
                  documentType: documentType, reservationNumber: reservationNumber}, {headers: {'Content-Type': 'application/json'}})
                  .then(function(response)
                {
                    reservations = response.data;
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
