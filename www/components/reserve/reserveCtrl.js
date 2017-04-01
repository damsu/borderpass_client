app.controller('reserveCtrl', ['$scope', '$http', '$q', '$ionicPopup', 'Borders', function ($scope, $http, $q, $ionicPopup, Borders) {

    var departure;
    var destination;
    var crossing;
    var flags = [];
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
		$scope.stage = 2;
	}

	$scope.saveDestination = function(to_country){
		destination = to_country;
		$scope.addresses = Borders.crossingCities(departure, to_country);
		$scope.stage = 3;
	}

	$scope.saveCrossing = function(address){
		crossing = address;
		$scope.message = "Going from " + departure + " to " + destination + " via " + crossing;
		$scope.stage = 4;
	}
}]);
