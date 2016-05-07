'use strict';

var app = angular.module('authApp');

app.controller('authFormCtrl', function($scope, $state, Auth) {
  console.log('authFormCtrl!');

  $scope.currentState = $state.current.name;

  $scope.submitForm = () => {
    if($scope.currentState === 'register') {

      // register user
      if($scope.user.password !== $scope.user.password2) {
        
        $scope.user.password = '';
        $scope.user.password2 = '';
        
        alert('Passwords must match.')
      } else {
        Auth.register($scope.user)
          .then(res => {
            $state.go('home');
          })
          .catch(res => {
            alert(res.data.error);
          });
      }
    } else {
      // login user

      Auth.login($scope.user)
        .then(res => {
          
        })

    }
  };

});
