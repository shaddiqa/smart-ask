angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('SeminarsCtrl', function($scope, Seminars) {
  $scope.seminars = Seminars.all();
})

.controller('SeminarDetailCtrl', function($scope, $stateParams, Seminars, $http, $window, VeritransEndpoint, $timeout) {
  $scope.seminar = Seminars.get($stateParams.seminarId);

  $scope.pay = function() {
    var data = {
      "payment_type": "vtweb",
      "transaction_details": {
        "order_id": String(new Date().getTime()),
        "gross_amount": $scope.seminar.fee,
        "currency": $scope.seminar.currency
      },
      "vtweb": {
        "enabled_payments": [ "credit_card", "mandiri_clickpay" ]
      }
    }

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic NjJiMTVhN2QtZTVmOC00YjNjLTllYWItY2E4MjdjYTM3ZjU1Og=='
      }
    }

    $http.post(VeritransEndpoint.url + '/v2/charge', data, config).then(function(resp) {
        var browser = $window.open(resp.data.redirect_url, '_blank');

        browser.addEventListener('loadstart', function (event) {
          var url = event.url;

          if (url.match(/example.com/)) {
            var queryStringToJSON = function(url_string) {
              var pairs = url_string.split("?")[1].split('&');

              var result = {};
              pairs.forEach(function(pair) {
                pair = pair.split('=');
                result[pair[0]] = decodeURIComponent(pair[1] || '');
              });

              return JSON.parse(JSON.stringify(result));
            }

            var query_string = queryStringToJSON(url);

            $timeout(function() {
              if (query_string.status_code == '200') {
                $scope.pay = {
                  success: true,
                  message: "Booking code: " + query_string.order_id
                };
              }
            });

            browser.close();
          }

        });
      }, function(err) {
        $scope.error = {
          message: err.status
        };
      })
  }
})

.controller('AccountCtrl', function($scope) {
});
