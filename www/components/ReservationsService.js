angular.module('ReservationsService', []).service('Reservations', ["$q", "$http", function($q, $http) {
	var reservationID;
  var reservations;
  var reservationToEdit;
	return {
		postReservation: function(crossing, traveller, vehicle)
        {
            return $q(function(resolve, reject)
            {
                $http.post("https://border-pass-server.herokuapp.com/" + "reservations", {crossing: crossing,
                  traveller: traveller, vehicle: vehicle}, {headers: {'Content-Type': 'application/json'}})
                  .then(function(response)
                {
                    reservationID = response.data;
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
      var saved_reservations = reservations;
      return saved_reservations;
    },
    reservationToEdit: function(Res) {
      reservationToEdit = Res;
    },
    saved_reservationToEdit: function() {
      var saved_reservationToEdit = reservationToEdit;
      return saved_reservationToEdit;
    },
  getReservationByDocument: function(country, document_Type, document_Number)
  {
    return $q(function(resolve, reject)
            {
                var dataToSend = {"Citizenship": country,
                  "Document": document_Type, "DocumentNumber": document_Number};

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
