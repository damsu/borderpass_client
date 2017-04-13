app.controller('myreservationsCtrl', ["$scope", "$state", "Reservations", function ($scope, $state, Reservations) {

  var Reservation;
  // Default Search Mode
  $scope.searchMode = "document";
  $scope.reservationNumber = window.localStorage.getItem("ReservationIDs");

  // Function for changing search mode.
  $scope.switchSearchMode = function () {
    switch($scope.searchMode) {
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
    // Decide on what request to make based on the mode (button) selected.
    switch(by) {
      case "document":
        // TODO: Make the AJAX call for this one.
        Reservations.getReservationByDocument(this.country, this.documentType, this.reservationNumber).then(function(result){
          console.log("getting data...");
          $scope.Reservation = result;
          console.log($scope.Reservation);

        }).catch(function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Request Failed',
            template: 'Failed to get the Reservation'
          });
        });
        break;
      case "reservation":
        console.log(this.reservationNumber);
        Reservations.getReservationByID(this.reservationNumber).then(function(result){
          console.log("getting data...");
          $scope.Reservation = result;
          console.log($scope.Reservation);

      }).catch(function() {
          var alertPopup = $ionicPopup.alert({
              title: 'Request Failed',
              template: 'Failed to get the Reservation'
          });
      });
        break;
    }
    // Move to the reservation listing
    $state.go('myreservations/list');
  }
}]);
