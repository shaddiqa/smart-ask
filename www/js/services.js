angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Seminars', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var seminars = [
    { id: 0, name: 'Seminar 1' },
    { id: 1, name: 'Seminar 2' },
    { id: 2, name: 'Seminar 3' },
    { id: 3, name: 'Seminar 4' }
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
