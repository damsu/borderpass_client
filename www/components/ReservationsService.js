angular.module('ReservationsService', []).service('Reservations', ["$q", "$http", function($q, $http) {
	var reservationID;
  var reservations;
  var reservationToEdit;
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

        updateReservation: function(id, crossing, traveller, vehicle)
        {
            return $q(function(resolve, reject)
            {
                $http.put("https://border-pass-server.herokuapp.com/" + "reservations/id/" + id, {crossing: crossing,
                  traveller: traveller, vehicle: vehicle}, {headers: {'Content-Type': 'application/json'}})
                  .then(function(response)
                {
                    reservations = response.data;
                    resolve(reservations);
                },
                function(err)
                {
                    console.log("not working");
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
            reservations = [];
            reject();
          });
      });
    },
    saved_reservations: function() {
      console.log(reservations);
      var saved_reservations = reservations;
      return saved_reservations;
    },
    reservationToEdit: function(Res) {
      reservationToEdit = Res;
    },
    saved_reservationToEdit: function() {
      console.log(reservations);
      var saved_reservationToEdit = reservationToEdit;
      return saved_reservationToEdit;
    },
  getReservationByDocument: function(country, document_Type, document_Number)
  {
    return $q(function(resolve, reject)
            {
                var dataToSend = {"Citizenship": country,
                  "Document": document_Type, "DocumentNumber": document_Number};
                  console.log(dataToSend);

                $http.post("https://border-pass-server.herokuapp.com/" + "reservations/docNum", dataToSend, {headers: {'Content-Type': 'application/json'}})
                  .then(function(response)
                {
                    reservations = response.data;
                    resolve(reservations);
                },
                function(err)
                {
                    reservations = [];
                    reject();
                });
            });
  }
}


}]);
