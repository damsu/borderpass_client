app.controller('myreservations_result_Ctrl', ["$scope", "$state", "$ionicPopup", "Reservations", "Borders", function ($scope, $state, $ionicPopup, Reservations, Borders) {

  $scope.Reservations = Reservations.saved_reservations();

  $scope.editTraveller = function(Reservation){
    Reservations.reservationToEdit(Reservation);
    $state.go('myreservations/editTraveller');
  };

  $scope.editVehicle = function(Reservation){
    Reservations.reservationToEdit(Reservation);
    $state.go('myreservations/editVehicle');
  };
}]);
