app.controller('reserveCtrl', ['$ionicHistory', '$scope', '$http', '$q', '$ionicPopup', 'Borders', 'ionicDatePicker', 'ionicTimePicker', function ($ionicHistory, $scope, $http, $q, $ionicPopup, Borders, ionicDatePicker, ionicTimePicker) {

    var departure;
    var destination;
    var crossing;
    var flags = [];
    $scope.date = "Date";
    $scope.time = "Time";
    var image_style_active = "height:35px; width:60px;box-shadow: 0px 0px 20px green;";
    var image_style_inactive = "height:35px; width:60px;";

    $scope.Person = {
    	Firstname : null,
    	Middlename : null,
    	Lastname : null,
    	Birthday : null,
    	Citizenship : null,
    	Document : null,
    	DocumentNumber : null,
    	Email : null,
    	PhoneNumber : null
    }

    $scope.Vehicle = {
    	CarType : null,
    	CarPlate : null,
    	Owner : null,
    	CarManufacturer : null,
    	CarModel : null
    }

    $scope.init = function(){
    	$ionicHistory.clearCache();
    	$scope.loading = true;
    	$scope.crossing = "";
    	$scope.date = "Date";
    	$scope.time = "Time";
    	$scope.fulldatetime = "";
    	$scope.progress_flag_left = "blank.png";
    	$scope.progress_flag_left_style = image_style_active;
	    $scope.progress_flag_right = "blank.png";
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing = "border_blank.png";
	    $scope.progress_crossing_style = image_style_inactive;
	    $scope.stage = 0;
	    $scope.arrow_style = "width: 100%; height: 15px; display: flex; justify-content: flex-start;";
	    
	    Borders.fetchFromServer().then(function(){
	        console.log("fetched all borders");

	        $scope.departures = Borders.departureCountries();
	        angular.forEach($scope.departures, function(value, key)
	        {
	        	console.log(value);
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
	    
    }

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
        $scope.progress_flag_left = Borders.getFlagFrom(from_country);
        $scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_active;
	    $scope.progress_crossing_style = image_style_inactive;
		$scope.stage = 2;
	}

	$scope.saveDestination = function(to_country){
		destination = to_country;
		$scope.addresses = Borders.crossingCities(departure, to_country);
		$scope.progress_flag_right = Borders.getFlagFrom(to_country);
		$scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing_style = image_style_active;
		$scope.stage = 3;
	}

	$scope.saveCrossing = function(address){
		crossing = address;
		$scope.crossing = crossing;
		$scope.progress_crossing = "border_filled.png";
		$scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing_style = image_style_inactive;
		$scope.stage = 4;
	}

	$scope.goBackTo = function(currentStage, stageToGo){
		if (stageToGo == 1)
		{
    		$scope.init();
		} 
		else if (stageToGo == 2 && currentStage > 1)
		{	
			$scope.progress_flag_right = "blank.png";
    		$scope.progress_crossing = "border_blank.png";
    		$scope.crossing = "";
			$scope.saveDeparture(departure);

		} 
		else if (stageToGo == 3 && currentStage > 2)
		{
			$scope.progress_crossing = "border_blank.png";
			$scope.crossing = "";
			$scope.saveDestination(destination);
		}
		else if (stageToGo == 4 && currentStage > 3)
		{
			$scope.fulldatetime = "";
			$scope.stage = 4;
		}
	}

	var ipObj1 = {
      callback: function (val) {  //Mandatory 
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var date = new Date(val);
        $scope.date = date.toDateString();
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

    var ipObj2 = {
    callback: function (val) {      //Mandatory 
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.time = selectedTime.getUTCHours() + ':' + addZero(selectedTime.getUTCMinutes());
        
      }
    },
    inputTime: 50400,   //Optional 
    format: 24,         //Optional 
    step: 30,           //Optional 
    setLabel: 'Set'    //Optional 
  };
  
  $scope.openTimePicker = function(){
  	ionicTimePicker.openTimePicker(ipObj2);
  };

  $scope.toPersonInfo = function(){
  	if ($scope.date != "Date" && $scope.time != "Time"){
  		$scope.fulldatetime = $scope.date + ' @ ' + $scope.time;
  		$scope.stage = 5;
  	}
  };

  $scope.toVehicleInfo = function(){
  	$scope.stage = 6;
  };

  $scope.toConfirmView = function(){
  	$scope.stage = 7;
  };

  var ipObj3 = {
      callback: function (val) {  //Mandatory 
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
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
