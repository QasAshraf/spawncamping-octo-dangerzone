'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard',
    'myApp.account',
    'myApp.version',
    'myApp.room'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }])

    .factory('groupFactory', ['$http', function ($http) {
        var url = "/tagchat-api/current/examples/location.json"
        var dataFactory = {};
        dataFactory.getGroups = function () {
            return $http.get(url);
        };
        return dataFactory;
    }]);
