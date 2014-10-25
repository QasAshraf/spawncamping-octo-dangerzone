'use strict';

angular.module('myApp.account', ['ngRoute', 'ngTagsInput'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/account', {
            templateUrl: 'account/account.html',
            controller: 'AccountCtrl'
        });
    }])

    .controller('AccountCtrl', function($scope, UserService)
    {
        $scope.user = UserService.get();
        $scope.update = function(user) {
            UserService.save(angular.copy(user));
        };

        $scope.loadTags = function (query) {
            //@todo
        };
    });