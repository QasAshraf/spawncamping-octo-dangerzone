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
            zoom: 8,
            bounds: {}
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    $scope.map.center = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                });
            });
        }
        $scope.UserName = "ben3005";
        $scope.marker = {
            idKey: 1,
            coords: {
                latitude: 53.476621,
                longitude: -2.253648
            }
        }

        //set a default centre so that if the location is denied it will use defaults
        map.center = {
            latitude: 53.4667,
            longitude: 2.2333
        };

        $scope.map = map;
        GoogleMapApi.then(function (maps) {
            console.log($scope.map)
        });
    }]);