app.controller('myreservationsCtrl', ["$scope", "$rootScope", "$state", "$ionicPopup", "Reservations", "Borders",
  function ($scope, $rootScope, $state, $ionicPopup, Reservations, Borders) {

    // Fetch the border related informtaion
    //borders = Borders.fetchFromServer();
    var borders;

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
    };

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
    };

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
    };

    $scope.update = function (value) {
      $scope.formData.reservationNumber = value;
    };

    // Closes alert that states no reservations were found.
    $scope.closeAlert = function () {
      $scope.closed = true;
    };

    // Search reservations
    $scope.search = function (by) {
      $scope.Reservations = [];
      $scope.loading = true;
      // Decide on what request to make based on the mode (button) selected.
      switch (by) {
        case "document":
          // Proceed if the form is valid
          if (this.documentSearchForm.$valid) {
            Reservations.getReservationByDocument($scope.formData.country, $scope.formData.documentType, $scope.formData.documentNumber).then(function (result) {
              $scope.loading = false;
              $scope.Reservations = result;
              // Form will display that submitted form returned no reservation
              if ($scope.Reservations.length == 0) {
                $scope.empty = true;
                $scope.closed = false;
              }
              // Move to the reservation listing
              else {
                $scope.empty = false;
                $scope.closed = false;
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
              $scope.loading = false;
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
