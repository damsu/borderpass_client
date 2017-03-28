app.controller('reserveCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

	$http({
    method:'GET',
    url:'https://border-pass-server.herokuapp.com/borders'
	}).then(function(response){
		console.log("test" + response.data);
    $scope.crossings = response.data;
	}, function(response){
    //error
    //show an appropriate message
	});

	$scope.saveFromCountry = function(from_country){
		$scope.from_country = from_country;
	}

	$scope.saveToCountry = function(to_country){
		$scope.to_country = to_country;
	}

	$scope.saveAddress = function(address){
		$scope.address = address;
	}
}]);
