app.controller('myreservations_editTraveller_Ctrl', ["$scope", "$state", "$ionicPopup", "Reservations", function ($scope, $state, $ionicPopup, Reservations) {

  $scope.Reservations = Reservations.saved_reservations();
  console.log($scope.Reservations);

}]);
