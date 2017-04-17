app.controller('myreservationsCtrl', ["$scope", "$state", "$ionicPopup", "Reservations", function ($scope, $state, $ionicPopup, Reservations) {

  var Reservation;
  // Default Search Mode
  $scope.searchMode = "document";
  $scope.reservationNumber = window.localStorage.getItem("ReservationIDs");

  // Function for changing search mode.
  $scope.switchSearchMode = function () {
    switch ($scope.searchMode) {
      case "document":
        $scope.searchMode = "reservation";
        break;
      case "reservation":
        $scope.searchMode = "document";
        break;
    }
  };

  // Search reservations
  $scope.search = function (by) {
    $scope.Reservation = [];
    // Decide on what request to make based on the mode (button) selected.
    switch (by) {
      case "document":
        // Proceed if the form is valid
        if (this.documentSearchForm.$valid) {
          // TODO: Make the AJAX call for this one.
          Reservations.getReservationByDocument($scope.country, $scope.documentType, $scope.documentNumber).then(function (result) {
            $scope.Reservation = result;

          }).catch(function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Request Failed',
              template: 'Failed to get the Reservation'
            });
          });
        }
        break;
      case "reservation":
        // Proceed if the form is valid
        if (this.reservationSearchForm.$valid) {
          Reservations.getReservationByID($scope.reservationNumber).then(function (result) {
            $scope.Reservation = result;
            // Form will display that submitted form returned no reservation
            if ($scope.Reservation.length == 0) {
              $scope.empty = true;
            }
            // Move to the reservation listing
            else {
            $state.go('myreservations/list');
            //console.log(Reservations.reservations.crossing.Date);
            }
          }).catch(function () {
            var alertPopup = $ionicPopup.alert({
              title: 'Request Failed',
              template: 'Failed to get the Reservation'
            });
          });
        }
        break;
    }
    
  }
}]);
