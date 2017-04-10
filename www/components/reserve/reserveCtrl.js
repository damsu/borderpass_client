app.controller('reserveCtrl', ['$ionicHistory', '$scope', '$http', '$q', '$ionicPopup', 'Borders', 'ionicDatePicker', 'ionicTimePicker', function ($ionicHistory, $scope, $http, $q, $ionicPopup, Borders, ionicDatePicker, ionicTimePicker) {

    var destination;
    var crossing;
    var flags = [];
    $scope.date = "Date";
    $scope.time = "Time";
    var image_style_active = "height:35px; width:60px;box-shadow: 0px 0px 10px green;";
    var image_style_inactive = "height:35px; width:60px;";

    $scope.Crossing = {
    	Departure : null,
    	Destination : null,
    	Address : "",
    	Date : "Date",
    	Time : "Time"
    }

    $scope.Person = {
    	Firstname : null,
    	Middlename : null,
    	Lastname : null,
    	Birthday : null,
    	Citizenship : null,
    	Document : null,
    	DocumentNumber : null,
    	Email : null,
    	PhoneNumber : null,
    	Remember : false
    }

    $scope.Vehicle = {
    	CarType : null,
    	CarPlate : null,
    	Owner : null,
    	CarManufacturer : null,
    	CarModel : null,
    	Remember : false
    }

    $scope.init = function(){
    	$ionicHistory.clearCache();
    	$scope.loading = true;
    	$scope.Crossing.Address = "";
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
		$scope.Crossing.Departure = from_country;
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
		$scope.Crossing.Destination = to_country;
		$scope.addresses = Borders.crossingCities($scope.Crossing.Departure, to_country);
		$scope.progress_flag_right = Borders.getFlagFrom(to_country);
		$scope.progress_flag_left_style = image_style_inactive;
	    $scope.progress_flag_right_style = image_style_inactive;
	    $scope.progress_crossing_style = image_style_active;
		$scope.stage = 3;
	}

	$scope.saveCrossing = function(address){
		$scope.Crossing.Address = address;
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
	}

	var ipObj1 = {
      callback: function (val) {  //Mandatory 
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var date = new Date(val);
        $scope.Crossing.Date = date.toDateString();
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
        $scope.Crossing.Time = selectedTime.getUTCHours() + ':' + addZero(selectedTime.getUTCMinutes());
        
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
  	if ($scope.Crossing.Date != "Date" && $scope.Crossing.Time != "Time"){
  		if (window.localStorage.hasOwnProperty("Person")) {
  			$scope.Person = JSON.parse(window.localStorage.getItem("Person"));
		}
  		$scope.stage = 5;
  	}
  };

  $scope.toVehicleInfo = function(){
  	console.log($scope.Person.Remember);
  	if ($scope.Person.Remember == true){
  		window.localStorage.setItem("Person",JSON.stringify($scope.Person));
  	} else {
  		window.localStorage.removeItem("Person");
  	}
  	console.log(window.localStorage.getItem("Vehicle"));
  	console.log(window.localStorage.hasOwnProperty("Vehicle"));
  	if (window.localStorage.hasOwnProperty("Vehicle")) {
  		console.log("went here");
  		$scope.Vehicle = JSON.parse(window.localStorage.getItem("Vehicle"));
	}
  	$scope.stage = 6;
  };

  $scope.toConfirmView = function(){
  	console.log($scope.Vehicle.Remember);
  	if ($scope.Vehicle.Remember == true){
  		window.localStorage.setItem("Vehicle",JSON.stringify($scope.Vehicle));
  	} else {
  		window.localStorage.removeItem("Vehicle");
  	}
  	$scope.test = "Confirmation view";
  	$scope.stage = 7;
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
