'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard',
    'myApp.account',
    'myApp.room',
    'myApp.login',
    'myApp.register'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);

app.run(["$rootScope", "$location", "AuthService" ,function ($rootScope, $location, AuthService) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
    });

    AuthService.init();

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}])
.controller('mainController', ['AuthService', "$location", '$scope', function (AuthService, $location, $scope) {
    $scope.loggedin = AuthService.isLoggedIn();
    console.log(AuthService.isLoggedIn());
    $scope.logout = function () {
        AuthService.logout();
        $location.path("/");
        $scope.loggedin = AuthService.isLoggedIn();
    }
        
}]);
