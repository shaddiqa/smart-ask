// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'UserApp', 'starter.controllers', 'starter.services'])

.constant('VeritransEndpoint', {
  url: 'https://api.sandbox.veritrans.co.id',
  client_key: 'VT-client-KmoNBAviU22ahVeb',
  charge_proxy_url: 'https://smart-ask-server.herokuapp.com'
})

.constant('SeminarConstants', {
  available_seminar_categories: ['technology', 'agriculture', 'politic', 'art', 'medical']
})

.run(function($ionicPlatform, user) {
  // Initiate the user service with your UserApp App Id
  // https://help.userapp.io/customer/portal/articles/1322336-how-do-i-find-my-app-id-
  user.init({ appId: '569b75fbe2632' });

  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // the login route
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      data: {
        login: true
      }
    })

    // the signup route
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      data: {
        public: true
      }
    })

    .state('edit-categories', {
      url: '/categories/edit',
      templateUrl: 'templates/edit-categories.html',
      controller: 'EditCategoryCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.seminars', {
      url: '/seminars',
      views: {
        'tab-seminars': {
          templateUrl: 'templates/tab-seminars.html',
          controller: 'SeminarsCtrl'
        }
      }
    })

    .state('tab.seminar-detail', {
      url: '/seminar/:seminarId',
      views: {
        'tab-seminars': {
          templateUrl: 'templates/seminar-detail.html',
          controller: 'SeminarDetailCtrl'
        }
      }
    })

    .state('tab.payment', {
      url: '/seminar/:seminarId/pay',
      views: {
        'tab-seminars': {
          templateUrl: 'templates/payment.html',
          controller: 'PaymentCtrl'
        }
      }
    })

    .state('tab.discovers', {
      url: '/discovers',
      views: {
        'tab-discovers': {
          templateUrl: 'templates/tab-discovers.html',
          controller: 'DiscoversCtrl'
        }
      }
    })

    .state('tab.discover-list', {
      url: '/discover/:category',
      views: {
        'tab-discovers': {
          templateUrl: 'templates/discover-list.html',
          controller: 'DiscoverListCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
