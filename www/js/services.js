angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Seminars', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var seminars = [
    { id: 0, name: 'Seminar 1', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 1', date: '2016-01-01', time: '10:00:00' },
    { id: 1, name: 'Seminar 2', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 2', date: '2016-01-01', time: '10:00:00' },
    { id: 2, name: 'Seminar 3', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 3', date: '2016-01-01', time: '10:00:00' },
    { id: 3, name: 'Seminar 4', caption: 'Lorem ipsum', fee: 10000, currency: 'IDR', description: 'Dolor sit amet....', speaker: 'John Doe', city: 'Jakarta', location: 'Address 4', date: '2016-01-01', time: '10:00:00' }
  ];

  return {
    all: function() {
      return seminars;
    },
    get: function(seminarId) {
      // Simple index lookup
      return seminars[seminarId];
    }
  }
});
