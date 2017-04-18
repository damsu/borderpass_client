app.controller('myreservationsCtrl', ["$scope", "$rootScope", "$state", "$ionicPopup", "Reservations", function ($scope, $rootScope, $state, $ionicPopup, Reservations) {

  var Reservation;
  // Default Search Mode
  $scope.searchMode = "document";
  $scope.formData = { 
    reservationNumber: '',
    country: '',
    documentType: '',
    documentNumber: ''
   };
  $scope.empty = false;

  /*$rootScope.lookForStorageData = function () {
    if (window.localStorage.hasOwnProperty("Person")){
          $scope.has_saved_person_data = true;
    }

    if (window.localStorage.hasOwnProperty("ReservationIDs")){
          $scope.has_saved_res_num = true;
    }
  }*/
  

  // Function for changing search mode.
  $scope.switchSearchMode = function () {
    switch ($scope.searchMode) {
      case "document":
        $scope.searchMode = "reservation";
        break;
      case "reservation":
        $scope.searchMode = "document";
        break;
    }
  }

  //empty forms
  $scope.emptyForm = function (by) {
    switch (by) {
      case "document":
        $scope.formData.country = '';
        $scope.formData.documentType = '';
        $scope.formData.documentNumber = '';
        break;
      case "reservation":
        $scope.formData.reservationNumber = '';
        break;
    }
  }

  //fill forms with storage data
  $scope.fillForms = function (by) {
    switch (by) {
      case "reservation":
        var resNum = window.localStorage.getItem("ReservationIDs");
        $scope.formData.reservationNumber = resNum;
        break;

      case "document":
        var personData_string = window.localStorage.getItem("Person");
        var personData = JSON.parse(personData_string);
        $scope.formData.country = personData.Citizenship;
        $scope.formData.documentType = personData.Document;
        $scope.formData.documentNumber = personData.DocumentNumber;
        break;
    }
  }

  $scope.update = function (value) {
    $scope.formData.reservationNumber = value;
  }

  // Search reservations
  $scope.search = function (by) {
    $scope.Reservations = [];
    // Decide on what request to make based on the mode (button) selected.
    switch (by) {
      case "document":
        // Proceed if the form is valid
        if (this.documentSearchForm.$valid) {
          // TODO: Make the AJAX call for this one.
          Reservations.getReservationByDocument($scope.formData.country, $scope.formData.documentType, $scope.formData.documentNumber).then(function (result) {
            $scope.Reservations = result;
            console.log($scope.Reservations);
             // Form will display that submitted form returned no reservation
            if ($scope.Reservations.length == 0) {
              $scope.empty = true;
            }
            // Move to the reservation listing
            else {
              $scope.empty = false;
            $state.go('myreservations/list');
            }

          }).catch(function () {
            $scope.empty = true;
          });
        }
        break;
      case "reservation":
        // Proceed if the form is valid
        if (this.reservationSearchForm.$valid) {
          Reservations.getReservationByID($scope.formData.reservationNumber).then(function (result) {
            $scope.Reservations = result;
            // Form will display that submitted form returned no reservation
            if ($scope.Reservations.length == 0) {
              $scope.empty = true;
            }
            // Move to the reservation listing
            else {
              $scope.empty = false;
            $state.go('myreservations/list');
            }
          }).catch(function () {
            $scope.empty = true;
          });
        }
        break;
    }
    
  }
}]);
