'use strict';

angular.module('myApp.account', ['ngRoute', 'ngTagsInput'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/account', {
            templateUrl: 'account/account.html',
            controller: 'AccountCtrl'
        });
    }])

    .controller('AccountCtrl', function($scope, $http)
    {
        $scope.loadTags = function (query) {
            //@todo
        };
    });