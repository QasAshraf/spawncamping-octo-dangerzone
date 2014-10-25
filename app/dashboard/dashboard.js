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

    .controller('DashboardCtrl', ['$scope', 'GoogleMapApi'.ns(), 'groupFactory', function ($scope, GoogleMapApi, groupFacotry) {
        getGroups();
        function getGroups() {
            groupFacotry.getGroups()
                .success(function (grps) {
                    $scope.circles = [];
                    for (var i = 0; i < grps.locations.length; i++) {
                        $scope.circles.push({
                            id: grps.locations[i].id,
                            centre: {
                                latitude: grps.locations[i].lat,
                                longitude: grps.locations[i].lon
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
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        
        var map = {
            zoom: 14,
            bounds: {}
        };

        var marker = {
            idKey: 1,
            coords: {
                /*Default placement is manchester*/
                latitude: 53.476621,
                longitude: -2.253648
            }
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
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

        //set a default centre so that if the location is denied it will use defaults
        map.center = {
            /*Default placement is manchester*/
            latitude: 53.4667,
            longitude: -2.2333
        };

        $scope.map = map;
        GoogleMapApi.then(function (maps) {
            console.log($scope.circles)
        });
    }]);