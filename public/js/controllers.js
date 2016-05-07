'use strict';

var app = angular.module('authApp');

app.controller('authFormCtrl', function($scope) {
  console.log('authFormCtrl!');

  $scope.submitForm = () => {
    console.log('$scope.user:', $scope.user);
  };

});
