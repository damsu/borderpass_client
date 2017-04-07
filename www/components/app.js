// Initialize the application.
var app = angular.module('borderpass', ['ionic', 'angular.filter', 'CustomServices', 'ionic-datepicker', 'ionic-timepicker']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  });

app.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 24,
      step: 30,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })

app.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $compileProvider) {

  // note that you can also chain configs
  //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');

  $stateProvider

  // Each menu option has its own nav history stack:
  //TODO: Add the views not handled by the menu

    .state('home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'components/home/index.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('reserve', {
      url: '/reserve',
      views: {
        'menuContent': {
          templateUrl: 'components/reserve/index.html',
          controller: 'reserveCtrl'
        }
      }
    })

    .state('myreservations', {
      url: '/myreservations',
      views: {
        'menuContent': {
          templateUrl: 'components/myreservations/index.html',
          controller: 'myreservationsCtrl'
        }
      }
    })

    .state('preferences', {
      url: '/preferences',
      views: {
        'menuContent': {
          templateUrl: 'components/preferences/index.html',
          controller: 'preferencesCtrl'
        }
      }
    })

    .state('aboutus', {
      url: '/aboutus',
      views: {
        'menuContent': {
          templateUrl: 'components/aboutus/index.html',
          controller: 'aboutusCtrl'
        }
      }
    })

    // These are state views that are not handled by the menu
    //TODO: Add the views not handled by the menu

    .state('aboutus/clients', {
      url: '/aboutus/clients',
      views: {
        'menuContent': {
          templateUrl: 'components/aboutus/clients.html',
          controller: 'aboutusCtrl'
        }
      }
    })
    .state('aboutus/license', {
      url: '/aboutus/license',
      views: {
        'menuContent': {
          templateUrl: 'components/aboutus/license.html',
          controller: 'aboutusCtrl'
        }
      }
    })
    .state('myreservations/list', {
      url: '/myreservations/list',
      views: {
        'menuContent': {
          templateUrl: 'components/myreservations/list.html',
          controller: 'aboutusCtrl'
        }
      }
    });
  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});

app.controller('appCtrl', ["$scope", "$ionicHistory", function ($scope, $ionicHistory) {
  // Back button goes back to the previous page
  $scope.goBack = function () {
    $ionicHistory.goBack()
  };
}]);
