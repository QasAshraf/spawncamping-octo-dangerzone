'use strict';

angular.module('myApp.room', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/room/:bookId', {
            templateUrl: 'room/room.html',
            controller: 'RoomCtrl'
        });
    }])

    .controller('RoomCtrl', function($scope, $routeParams, RoomService) {
        console.log($routeParams);
        $scope.room = RoomService.get($routeParams['bookId']);
        console.log($scope.room);
    });