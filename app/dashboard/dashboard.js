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

    .controller('DashboardCtrl', ['$scope','GoogleMapApi'.ns() ,function ($scope, GoogleMapApi) {
        $scope.UserName = "ben3005";
        $scope.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {} };

        GoogleMapApi.then(function (maps) {
            alert("the map is loaded");
        });
    }]);