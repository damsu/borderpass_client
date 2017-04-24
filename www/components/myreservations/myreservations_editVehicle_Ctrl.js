app.controller('myreservations_editVehicle_Ctrl', ["$scope", "$state", "$ionicPopup", "Reservations", function ($scope, $state, $ionicPopup, Reservations) {

  $scope.Reservation = Reservations.saved_reservationToEdit();

  $scope.sendChanges = function(Reservation){
  	$scope.loading = true;
  	Reservations.updateReservation(Reservation._id, Reservation.crossing, Reservation.traveller, Reservation.vehicle).then(function(result){
	        $scope.loading = false;

	        var myPopup = $ionicPopup.show({
		         title: 'Update successful',
		         subTitle: 'New data has been sent to border crossing agency',
		         buttons: [
		           {
		               text: '<b>OK</b>',
		               type: 'button-positive',
		                  onTap: function(e) {
							 $state.go('myreservations');
		                  }
		            }
		         ]
		      });

	    }).catch(function() {
	    	$scope.loading = false;
	        var alertPopup = $ionicPopup.alert({
	            title: 'Update Failed',
	            template: 'Failed to update the Reservation'
	        });
	    });
  }

}]);
