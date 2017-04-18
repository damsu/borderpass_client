app.controller('myreservations_editVehicle_Ctrl', ["$scope", "$state", "$ionicPopup", "Reservations", function ($scope, $state, $ionicPopup, Reservations) {

  $scope.Reservations = Reservations.saved_reservations();
  console.log(Reservations.saved_reservations());

}]);
