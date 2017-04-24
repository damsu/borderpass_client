app.controller('preferencesCtrl', ["$scope", function ($scope) {


	$scope.init = function(){
		if (window.localStorage.hasOwnProperty("Person")||window.localStorage.hasOwnProperty("Vehicle")||window.localStorage.hasOwnProperty("ReservationIDs")){
	  		$scope.no_data = false;
  		} else {
	  		$scope.no_data = true;
  		}
	};

	$scope.deleteData = function(){
		window.localStorage.removeItem("Person");
		window.localStorage.removeItem("Vehicle");
		window.localStorage.removeItem("ReservationIDs");
		$scope.init();
	};

	$scope.init();
}]);
