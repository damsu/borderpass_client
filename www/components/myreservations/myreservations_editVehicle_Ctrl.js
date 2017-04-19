app.controller('myreservations_editVehicle_Ctrl', ["$scope", "$state", "$ionicPopup", "Reservations", function ($scope, $state, $ionicPopup, Reservations) {

  $scope.Reservation = Reservations.saved_reservationToEdit();
  console.log($scope.Reservations);

  $scope.sendChanges = function(Reservation){
  	$scope.loading = true;
  	Reservations.updateReservation(Reservation._id, Reservation.crossing, Reservation.traveller, Reservation.vehicle).then(function(result){
	        console.log("updating");
	        $scope.loading = false;
	        $state.go('myreservations');

	    }).catch(function() {
	    	$scope.loading = false;
	    	$state.go('myreservations');
	        /*var alertPopup = $ionicPopup.alert({
	            title: 'Request Failed',
	            template: 'Failed to update the Reservation'
	        });*/
	    });
  }

}]);
