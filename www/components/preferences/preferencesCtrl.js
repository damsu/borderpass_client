app.controller('preferencesCtrl', ["$scope", function ($scope) {


	$scope.init = function(){
		if (window.localStorage.hasOwnProperty("Person")||window.localStorage.hasOwnProperty("Vehicle")){
	  		$scope.pers_data_deletable = false;
  		} else {
	  		$scope.pers_data_deletable = true;
  		}

  		if (window.localStorage.hasOwnProperty("ReservationIDs")){
	  		$scope.res_nums_deletable = false;
  		} else {
	  		$scope.res_nums_deletable = true;
  		}
  		console.log("Person : " + window.localStorage.getItem("Person"));
  		console.log("Vehicle : " + window.localStorage.getItem("Vehicle"));
  		console.log("ReservationIDs : " + window.localStorage.getItem("ReservationIDs"));
	}

	$scope.deletePersonData = function(){
		window.localStorage.removeItem("Person");
		window.localStorage.removeItem("Vehicle");
		$scope.init();
	}

	$scope.deleteResNums = function(){
		window.localStorage.removeItem("ReservationIDs");
		$scope.init();
	}
}]);
