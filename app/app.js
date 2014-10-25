'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard',
    'myApp.account',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }])
    .controller('AppCtrl', ['$scope' ,function ($scope) {
        $scope.user = {"name": "test"};
    }]);
