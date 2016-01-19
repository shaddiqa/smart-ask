angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Seminars', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var seminars = [
    { id: 0, name: 'Seminar 1', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 1', date: '2016-01-01', time: '10:00:00', booking_code: undefined },
    { id: 1, name: 'Seminar 2', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 2', date: '2016-01-01', time: '10:00:00', booking_code: undefined },
    { id: 2, name: 'Seminar 3', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 3', date: '2016-01-01', time: '10:00:00', booking_code: undefined },
    { id: 3, name: 'Seminar 4', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 4', date: '2016-01-01', time: '10:00:00', booking_code: undefined }
  ];

  return {
    all: function() {
      return seminars;
    },
    get: function(seminarId) {
      // Simple index lookup
      return seminars[seminarId];
    }
  };
})

.factory('VeritransService', function(VeritransEndpoint, $http) {
  return {
    charge: function(seminar, success_callback, error_callback) {
      var data = {
        "payment_type": "vtweb",
        "transaction_details": {
          "order_id": String(new Date().getTime()),
          "gross_amount": seminar.fee,
          "currency": seminar.currency
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
        success_callback(resp);
      }, function(err) {
        error_callback(err);
      });
    }
  };
})

.factory('QueryStringParser', function() {
  return {
    parse: function(url_string) {
      var pairs = url_string.split("?")[1].split('&');

      var result = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });

      return JSON.parse(JSON.stringify(result));
    }
  };
});
