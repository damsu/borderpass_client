app.controller('reserveCtrl', ['$ionicHistory', '$scope', '$timeout', '$http', '$q', '$ionicPopup', 'Borders',
'Reservations', 'ionicDatePicker', 'ionicTimePicker', '$ionicScrollDelegate',
function ($ionicHistory, $scope,$timeout, $http, $q, $ionicPopup, Borders, Reservations, ionicDatePicker, ionicTimePicker, $ionicScrollDelegate) {

    var destination;
    var crossing;
    var flags = [];
    $scope.date = "Date";
    $scope.time = "Time";
    var image_style_active = "height:35px; width:60px;box-shadow: 0px 0px 5px green; border: 2px solid #90c590";
    var image_style_inactive = "height:35px; width:60px;";

    $scope.Crossing = {
    	Departure : null,
    	Destination : null,
    	Address : "",
    	Date : "Date",
    	Time : "Time"
    };

    $scope.Person = {
    	Remember : false,
    	Firstname : null,
    	Middlename : null,
    	Lastname : null,
    	Birthday : null,
    	Citizenship : null,
    	Document : null,
    	DocumentNumber : null,
    	Email : null,
    	PhoneNumber : null,
      Company : null
    };

    $scope.Vehicle = {
    	Remember : false,
    	CarType : null,
    	CarPlate : null,
    	Owner : null,
    	CarManufacturer : null,
    	CarModel : null
    };
    $scope.copied;
    $scope.reservationID;
    $scope.checkingBank = false;
    $scope.timesNotForChoosing = [];
    $scope.hasTimesInArray = false;

    $scope.init = function(){
    	$ionicHistory.clearCache();
    	$scope.loading = true;
    	$scope.copied = false;
    	$scope.Crossing.Address = "";
    	$scope.progress_flag_left = "blank.png";
    	$scope.progress_flag_left_style = image_style_active;
	    $scope.progress_flag_right = "blank.png";
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing = "border_blank.png";
	    $scope.progress_crossing_style = image_style_inactive;
	    $scope.stage = 0;
	    $scope.arrow_style = "width: 100%; height: 15px; display: flex; justify-content: flex-start;";
      $scope.timesNotForChoosing = [];
      $scope.hasTimesInArray = false;
      $scope.Crossing.Date = "Date";
      $scope.Crossing.Time = "Time";

	    Borders.fetchFromServer().then(function(){

	        $scope.departures = Borders.departureCountries();
	        angular.forEach($scope.departures, function(value, key)
	        {
	        	flags.push(Borders.getFlagFrom(value));
	        	$scope.loading = false;
	        	$scope.stage = 1; //has to be 1 but can be changed for test purpose
	        });
	        $scope.flags = flags;
	        flags = [];

	    }).catch(function() {
	        var alertPopup = $ionicPopup.alert({
	            title: 'Request Failed',
	            template: 'Failed to fetch Borders data from server'
	        });
	    });
    };

	$scope.saveDeparture = function(from_country){
		$scope.Crossing.Departure = from_country;
		$scope.destinations = Borders.destinationsFrom(from_country);
		angular.forEach($scope.destinations, function(value, key)
        {
        	flags.push(Borders.getFlagFrom(value));
        });
        $scope.flags = flags;
        flags = [];
        $scope.progress_flag_left = Borders.getFlagFrom(from_country);
        $scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_active;
	    $scope.progress_crossing_style = image_style_inactive;
		$scope.stage = 2;
	};

	$scope.saveDestination = function(to_country){
		$scope.Crossing.Destination = to_country;
		$scope.addresses = Borders.crossingCities($scope.Crossing.Departure, to_country);
		$scope.progress_flag_right = Borders.getFlagFrom(to_country);
		$scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing_style = image_style_active;
		$scope.stage = 3;
	};

	$scope.saveCrossing = function(address){
		$scope.Crossing.Address = address;
		$scope.progress_crossing = "border_filled.png";
		$scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing_style = image_style_inactive;
    $scope.checkTimeslots();
    if ($scope.Crossing.Date != "Date"){
      getTimesNotForChoosing();
    }
		$scope.stage = 4;
	};

  $scope.checkTimeslots = function() {
    $scope.timesNotForChoosing = [];
    $scope.unavailableTimes = Borders.getTimeslots($scope.Crossing.Address);
  }

	$scope.goBackTo = function(currentStage, stageToGo){
    $ionicScrollDelegate.scrollTop();
		if (stageToGo == 1)
		{
    		$scope.init();
		}
		else if (stageToGo == 2 && currentStage > 1)
		{
			$scope.progress_flag_right = "blank.png";
    		$scope.progress_crossing = "border_blank.png";
    		$scope.Crossing.Address = "";
			$scope.saveDeparture($scope.Crossing.Departure);

		}
		else if (stageToGo == 3 && currentStage > 2)
		{
			$scope.progress_crossing = "border_blank.png";
			$scope.Crossing.Address = "";
			$scope.saveDestination($scope.Crossing.Destination);
		}
		else if (stageToGo == 4 && currentStage > 3)
		{
			$scope.stage = 4;
		}
		else if (stageToGo == 5 && currentStage > 4)
		{
			$scope.stage = 5;
		}
		else if (stageToGo == 6 && currentStage > 5)
		{
			$scope.stage = 6;
		}
		else if (stageToGo == 7 && currentStage > 6)
		{
			$scope.stage = 7;
		}
	};

  function checkForValues(json, value) {
    for (key in json) {
        if (key === value) {
            return json[key];
        }
    }
    return false;
  }

  function getTimesNotForChoosing(){
    if(checkForValues($scope.unavailableTimes, $scope.Crossing.Date) != false){
      $scope.hasTimesInArray = true;
      $scope.timesNotForChoosing = checkForValues($scope.unavailableTimes, $scope.Crossing.Date);
    } else {
      $scope.hasTimesInArray = false;
      $scope.timesNotForChoosing = [];
    }
  }

	var ipObj1 = {
      callback: function (val) {  //Mandatory
        var date = new Date(val);
        $scope.Crossing.Date = date.toDateString();
        getTimesNotForChoosing();
      },
      from: new Date(), //Optional
      to: new Date(2017, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    function isInArray(value, array) {
      return array.indexOf(value) > -1;
    }

    var ipObj2 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
      } else {
        var selectedTime = new Date(val * 1000);
        if (isInArray((selectedTime.getUTCHours() + ':' + addZero(selectedTime.getUTCMinutes())), $scope.timesNotForChoosing)){
          $scope.openTimePicker();
        } else {
          $scope.Crossing.Time = selectedTime.getUTCHours() + ':' + addZero(selectedTime.getUTCMinutes());
        }
        

      }
    },
    inputTime: 50400,   //Optional
    format: 24,         //Optional
    step: 10,           //Optional
    setLabel: 'Set'    //Optional
  };

  $scope.openTimePicker = function(){
  	ionicTimePicker.openTimePicker(ipObj2);
  };

  $scope.toPersonInfo = function(){
    $ionicScrollDelegate.scrollTop();
  	if ($scope.Crossing.Date != "Date" && $scope.Crossing.Time != "Time"){
  		if (window.localStorage.hasOwnProperty("Person")) {
  			$scope.Person = JSON.parse(window.localStorage.getItem("Person"));
		}
  		$scope.stage = 5;
  	}
  };

  $scope.toVehicleInfo = function(){
    $ionicScrollDelegate.scrollTop();
  	if ($scope.Person.Remember == true){
  		window.localStorage.setItem("Person",JSON.stringify($scope.Person));
  	} else {
  		window.localStorage.removeItem("Person");
  	}
  	if (window.localStorage.hasOwnProperty("Vehicle")) {
  		$scope.Vehicle = JSON.parse(window.localStorage.getItem("Vehicle"));
	}
  	$scope.stage = 6;
  };

  $scope.toConfirmView = function(){
    $ionicScrollDelegate.scrollTop();
  	if ($scope.Vehicle.Remember == true){
  		window.localStorage.setItem("Vehicle",JSON.stringify($scope.Vehicle));
  	} else {
  		window.localStorage.removeItem("Vehicle");
  	}
  	$scope.test = "Confirmation view";
  	$scope.stage = 7;
  };

  $scope.toPayment = function(){
    $ionicScrollDelegate.scrollTop();
    $scope.stage = 8;
  }

  $scope.checkBank = function(){
    $ionicScrollDelegate.scrollTop();
    $scope.checkingBank = true;
    $timeout(function () {
                  $scope.bankOk();
            }, 3000);
  };

  $scope.bankOk = function(){
    $scope.checkingBank = false;
    $scope.sendReservation();
  };



  $scope.showConfirm = function() {
   		var confirmPopup = $ionicPopup.confirm({
     		title: 'Change Crossing Info',
     		template: 'This will reset your choices for the Crossing, are you sure?'
   		});

   		confirmPopup.then(function(res) {
     		if(res) {
       			$scope.init();
     		} else {
       			console.log('Stayed');
     		}
   		});
 	};

  $scope.sendReservation = function(){
  	$scope.PersonToSend = $scope.Person;
  	$scope.VehicleToSend = $scope.Vehicle;
  	$scope.copied = false;
  	delete $scope.PersonToSend.Remember;
  	delete $scope.VehicleToSend.Remember;
    if ($scope.PersonToSend.Company == null || $scope.PersonToSend.Company == "") {
      $scope.PersonToSend.Company = "No affiliated Company";
    }
  	Reservations.postReservation($scope.Crossing, $scope.PersonToSend, $scope.VehicleToSend).then(function(result){
          if (result == "TIMESLOT ALREADY TAKEN!"){
            var myPopup = $ionicPopup.show({
             title: 'Someone just stole your time!',
             subTitle: 'Sorry, you were too slow, you will have to pick a new time !',
             buttons: [
               {
                   text: '<b>OK</b>',
                   type: 'button-positive',
                      onTap: function(e) {
                        $scope.init();
                      }
                }
             ]
          });
          } else {
            $scope.reservationID = result;
            $ionicScrollDelegate.scrollTop();
            $scope.stage = 9;
          }
	        

	    }).catch(function() {
	        var alertPopup = $ionicPopup.alert({
	            title: 'Request Failed',
	            template: 'Failed to post the Reservation'
	        });
	    });
  };

  $scope.copyToLocalStorage = function(){
  		window.localStorage.setItem("ReservationIDs",$scope.reservationID);
  		$scope.copied = true;
  };

  var ipObj3 = {
      callback: function (val) {  //Mandatory
        var birthday = new Date(val);
        $scope.Person.Birthday = birthday.toDateString();
      },
      from: new Date(1900, 1, 1), //Optional
      to: new Date(), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openBirthdayPicker = function(){
      ionicDatePicker.openDatePicker(ipObj3);
    };

  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }
}]);
