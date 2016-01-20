angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('SeminarsCtrl', function($scope, Seminars) {
  $scope.seminars = Seminars.all();
})

.controller('SeminarDetailCtrl', function($scope, $stateParams, Seminars) {
  $scope.seminar = Seminars.get($stateParams.seminarId);
})

.controller('PaymentCtrl', function($scope, $stateParams, Seminars, VeritransService, QueryStringParser, $state){
  $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  $scope.seminar = Seminars.get($stateParams.seminarId);
  $scope.card = {};

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

.controller('AccountCtrl', function($scope) {
});
