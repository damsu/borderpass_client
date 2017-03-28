// Initialize the application.
var app = angular.module('borderpass', ['ionic', 'angular.filter']);


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
    });

  // These are state views that are not handled by the menu
  //TODO: Add the views not handled by the menu

  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
