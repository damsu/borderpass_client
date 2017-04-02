app.controller('aboutusCtrl', ["$scope", "$ionicHistory", function ($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
}]);
