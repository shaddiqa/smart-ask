angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('SeminarsCtrl', function($scope, Seminars) {
  $scope.seminars = Seminars.all();
})

.controller('SeminarDetailCtrl', function($scope, $stateParams, Seminars) {
  $scope.seminar = Seminars.get($stateParams.seminarId);
})

.controller('AccountCtrl', function($scope) {
});
