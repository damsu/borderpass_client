app.controller('myreservationsCtrl', ["$scope", "$state", function ($scope, $state) {

  // Default Search Mode
  $scope.searchMode = "document";

  // Function for changing search mode.
  $scope.switchSearchMode = function () {
    switch($scope.searchMode) {
      case "document":
        $scope.searchMode = "reservation";
        break;
      case "reservation":
        $scope.searchMode = "document";
        break;
    }
  };

  // Search reservations
  $scope.search = function (by) {
    // Decide on what request to make based on the mode (button) selected
    switch(by) {
      case "document":
        break;
      case "reservation":
        break;
    }
    // Move to the reservation listing
    $state.go('myreservations/list');
  }
}]);
