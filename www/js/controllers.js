angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, user, $state) {
  user.getCurrent().then(function(currentUser) {
    var user_categories = JSON.parse(currentUser.properties.categories.value);

    if (user_categories.length == 0) {
      $state.go('edit-categories');
    }
  });
})

.controller('EditCategoryCtrl', function($scope, user, UserApp, $state, SeminarConstants) {
  $scope.categories = [];

  user.getCurrent().then(function(currentUser) {
    var user_categories = JSON.parse(currentUser.properties.categories.value);

    var i;
    for (i of SeminarConstants.available_seminar_categories) {
      $scope.categories.push({name: i, selected: user_categories.indexOf(i) > -1});
    }
  });

  $scope.select = function() {
    user.getCurrent().then(function(currentUser) {
      var selected_categories = [];

      var i;
      for (i of $scope.categories) {
        if (i.selected) {
          selected_categories.push(i.name);
        }
      }

      currentUser.properties.categories = {
        value: JSON.stringify(selected_categories),
        override: true
      };

      UserApp.User.save(currentUser, function(error, result) {
        if (result) {
          $state.go("tab.seminars");
        }
      });
    });
  }
})

.controller('SeminarsCtrl', function($scope, Seminars, user) {
  $scope.seminars = [];

  user.getCurrent().then(function(currentUser) {
    var user_categories = JSON.parse(currentUser.properties.categories.value);

    var i;
    for (i of Seminars.all()) {
      var j;
      for (j of i.categories) {
        if (user_categories.indexOf(j) > -1) {
          $scope.seminars.push(i);
          break;
        }
      }
    }
  })
})

.controller('SeminarDetailCtrl', function($scope, $stateParams, Seminars) {
  $scope.seminar = Seminars.get($stateParams.seminarId);
})

.controller('PaymentCtrl', function($scope, $stateParams, Seminars, VeritransService, QueryStringParser, $state){
  $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  $scope.seminar = Seminars.get($stateParams.seminarId);

  $scope.card = {
    number: "4811111111111114",
    exp_year: "2099",
    cvv: "123"
  };

  $scope.pay = function() {
    var card = {
      number: $scope.card.number,
      exp_month: $scope.card.exp_month,
      exp_year: $scope.card.exp_year,
      cvv: $scope.card.cvv
    }

    VeritransService.token(card, function(response) {
      VeritransService.charge($scope.seminar, response.token_id, function(resp) {
        if (resp.data.status_code == '200') {
          $scope.seminar.booking_code = resp.data.order_id;
          $scope.seminar.paid = true;

          $state.go('tab.seminars');
        }
      }, function(err) {
        $scope.error = {
          message: err.status
        };
      });
    });
  }
})

.controller('DiscoversCtrl', function($scope, SeminarConstants) {
  $scope.categories = SeminarConstants.available_seminar_categories;
})

.controller('DiscoverListCtrl', function($scope, $stateParams, Seminars) {
  $scope.seminars = [];

  var i;
  for (i of Seminars.all()) {
    if (i.categories.indexOf($stateParams.category) > -1) {
      $scope.seminars.push(i);
    }
  }
})

.controller('AccountCtrl', function($scope, user) {
  user.getCurrent().then(function(currentUser) {
    $scope.selected_categories = currentUser.properties.categories.value;
  });
});
