'use strict';

var app = angular.module('authApp');

app.service('Auth', function($http) {

  this.register = userObj => {
    return $http.post('/api/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/api/users/login', userObj);
  };
  
});
