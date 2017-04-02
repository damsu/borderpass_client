app.controller('reserveCtrl', ['$scope', '$http', '$q', '$ionicPopup', 'Borders', function ($scope, $http, $q, $ionicPopup, Borders) {

    var departure;
    var destination;
    var crossing;
    var flags = [];

    $scope.progress_flag_left = "blank.png";
    $scope.progress_flag_right = "blank.png";
    $scope.progress_crossing = "border_blank.png";
    $scope.arrow_style = "width: 100%; height: 11px; display: flex; justify-content: flex-start; border-bottom: 2px solid black;";
    $scope.stage = 1;
    Borders.fetchFromServer().then(function(){
        console.log("fetched all borders");

        $scope.departures = Borders.departureCountries();
        angular.forEach($scope.departures, function(value, key)
        {
        	console.log(value);
        	flags.push(Borders.getFlagFrom(value));
        });
        $scope.flags = flags;
        flags = [];
    }).catch(function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Request Failed',
            template: 'Failed to fetch Borders data from server'
        });
    });

	$scope.saveDeparture = function(from_country){
		departure = from_country;
		$scope.destinations = Borders.destinationsFrom(from_country);
		angular.forEach($scope.destinations, function(value, key)
        {
        	console.log(value);
        	flags.push(Borders.getFlagFrom(value));
        });
        $scope.flags = flags;
        flags = [];
        $scope.progress_flag_left = Borders.getFlagFrom(from_country);
        $scope.arrow_style = "width: 100%; height: 11px; display: flex; justify-content: flex-end; border-bottom: 2px solid black;";
		$scope.stage = 2;
	}

	$scope.saveDestination = function(to_country){
		destination = to_country;
		$scope.addresses = Borders.crossingCities(departure, to_country);
		$scope.progress_flag_right = Borders.getFlagFrom(to_country);
		$scope.arrow_style = "width: 100%; height: 11px; display: flex; justify-content: center; border-bottom: 2px solid black;";
		$scope.stage = 3;
	}

	$scope.saveCrossing = function(address){
		crossing = address;
		$scope.crossing = crossing;
		$scope.progress_crossing = "border_filled.png";
		$scope.arrow_style = "display:none;";
		$scope.stage = 4;
	}
}]);
