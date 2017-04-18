app.controller('myreservations_result_Ctrl', ["$scope", "$state", "$ionicPopup", "Reservations", function ($scope, $state, $ionicPopup, Reservations) {

  $scope.Reservation = Reservations.saved_reservations();
  console.log(Reservations.saved_reservations());

}]);
