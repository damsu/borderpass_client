app.controller('myreservationsCtrl', ["$scope", function ($scope) {

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
    switch(by) {
      case "document":
        break;
      case "reservation":
        break;
    }
  }
}]);
