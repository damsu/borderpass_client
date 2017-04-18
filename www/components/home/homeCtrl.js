app.controller('homeCtrl', ["$scope",'$state', '$stateParams', function ($scope,$state, $stateParams) {
	$scope.goTo = function(_state) {
    $state.go(_state);
};

}]);
