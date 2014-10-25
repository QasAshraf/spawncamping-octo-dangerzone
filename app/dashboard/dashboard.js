'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'google-maps'.ns()])

    .config(['$routeProvider', 'GoogleMapApiProvider'.ns(), function ($routeProvider, GoogleMapApi) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });

        GoogleMapApi.configure({
            key: 'AIzaSyBH4AsqZUkTOWa2evVyiaFmW14cVdMFUJQ',
            libraries: '',
            language: 'en',
            sensor: 'false',
        });
    }])

    .controller('DashboardCtrl', ['$scope', 'GoogleMapApi'.ns(), function ($scope, GoogleMapApi) {
        var map = {
            zoom: 14,
            bounds: {}
        };

        var marker = {
            idKey: 1,
            coords: {
                latitude: 53.476621,
                longitude: -2.253648
            }
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    console.log(position);
                    $scope.map.center = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    $scope.marker.coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                });
            });
        }
        $scope.UserName = "ben3005";
        $scope.marker = marker;

        $scope.circles = [];

        $scope.circles.push({
            id: 1,
            centre: {
                latitude: 53.486004,
                longitude: -2.250322
            },
            radius: 500,
            stroke: {
                color: '#08B21F',
                weight: 2,
                opacity: 1
            },
            fill: {
                color: '#08B21F',
                weight: 2,
                opacity: 0.5
            }
        });

        $scope.circles.push({
            id: 2,
            centre: {
                latitude: 53.502939,
                longitude: -2.200099
            },
            radius: 500,
            stroke: {
                color: '#08B21F',
                weight: 2,
                opacity: 1.0
            },
            fill: {
                color: '#08B21F',
                weight: 2,
                opacity: 0.5
            }
        });

        //set a default centre so that if the location is denied it will use defaults
        map.center = {
            latitude: 53.4667,
            longitude: -2.2333
        };

        $scope.map = map;
        GoogleMapApi.then(function (maps) {
            console.log($scope.marker)
            console.log($scope.map.center)
        });
    }]);