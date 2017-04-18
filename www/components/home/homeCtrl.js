app.controller('homeCtrl', ["$scope",'$state', '$stateParams', function ($scope,$state, $stateParams) {
	$scope.goToReservation = function() {
    $state.go('reserve');
};

}]);
