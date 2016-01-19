angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('SeminarsCtrl', function($scope, Seminars) {
  $scope.seminars = Seminars.all();
})

.controller('SeminarDetailCtrl', function($scope, $stateParams, Seminars, $window, VeritransService, QueryStringParser, $timeout) {
  $scope.seminar = Seminars.get($stateParams.seminarId);

  $scope.pay = function() {
    VeritransService.charge($scope.seminar, function(resp) {
      var browser = $window.open(resp.data.redirect_url, '_blank');

      browser.addEventListener('loadstart', function (event) {
        var url = event.url;

        if (url.match(/example.com/)) {
          browser.close();

          var params = QueryStringParser.parse(url);

          $timeout(function() {
            if (params.status_code == '200') {
              $scope.seminar.booking_code = params.order_id;
            }
          });
        }
      });
    }, function(err) {
      $scope.error = {
        message: err.status
      };
    });
  }
})

.controller('AccountCtrl', function($scope) {
});
