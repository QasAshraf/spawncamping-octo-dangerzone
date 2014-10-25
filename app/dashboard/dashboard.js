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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    $scope.map = {
                        center: {
                            latitude: (position != 'undefined') ? position.coords.latitude : 53.4667,
                            longitude: (position != 'undefined') ? position.coords.longitude : 2.2333
                        },
                        zoom: 8,
                        bounds: {}
                    };
                });
            });
        }
        $scope.UserName = "ben3005";
        $scope.map = {
            center: {
                latitude: 53.4667,
                longitude: 2.2333
            },
            zoom: 8,
            bounds: {}
        };

        GoogleMapApi.then(function (maps) {
            console.log($scope.map)
        });
    }]);