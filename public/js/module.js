'use strict';

var app = angular.module('authApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })

    .state('register', {
      url: '/register',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })

  $urlRouterProvider.otherwise('/');
});

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  }
});

