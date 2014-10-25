'use strict';

angular.module('myApp.room', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/room/:bookId', {
            templateUrl: 'room/room.html',
            controller: 'RoomCtrl'
        });
    }])

    .controller('RoomCtrl', function($scope, $routeParams, RoomService, $location) {
        console.log($routeParams);
        $scope.room = RoomService.get($routeParams['bookId']);
        if (typeof($scope.room) === 'undefined') {
            $location.path('/dashboard');
        }
        console.log($scope.room);
    });