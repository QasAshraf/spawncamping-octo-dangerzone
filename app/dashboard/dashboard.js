'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'google-maps'.ns()])

    .config(['$routeProvider', 'GoogleMapApiProvider'.ns(), function ($routeProvider, GoogleMapApi) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                auth: function ($q, AuthService) {
                    var userInfo = AuthService.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }
            }
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
        $scope.CloseUsers = 0;
        $scope.circles = [];
        function getGroups() {
            groupFacotry.getGroups()
                .success(function (grps) {
                    for (var i = 0; i < grps.length; i++) {
                        $scope.circles.push({
                            id: grps[i].id,
                            centre: {
                                latitude: grps[i].lat,
                                longitude: grps[i].lon
                            },
                            radius: 200,
                            stroke: {
                                color: '#08B21F',
                                weight: 2,
                                opacity: 1
                            },
                            fill: {
                                color: '#08B21F',
                                weight: 2,
                                opacity: 0.5
                            },
                            count: parseInt(grps[i].count),
                            options: {
                                labelContent: 'asdasdas',
                                labelAnchor: '100 0',
                                labelClass: 'marker-labels'
                            }
                        });
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        

        $scope.$watch('circles', function () {
            if (typeof $scope.circles != 'undefined') {
                for (var i = 0; i < $scope.circles.length; i++) {
                    if ($scope.getDistanceBetweenKM($scope.circles[i].centre.latitude, $scope.circles[i].centre.longitude, $scope.marker.coords.latitude, $scope.marker.coords.longitude) < $scope.nearRadius) {
                        $scope.CloseUsers += parseInt($scope.circles[i].count);
                    }
                }
            }
        });

        $scope.$watch('marker.coords', function () {
            $scope.repaintNearRadius();
        });

        $scope.$watch('nearRadius', function () {
            $scope.CloseUsers = 0;
            if (typeof $scope.circles != 'undefined') {
                for (var i = 0; i < $scope.circles.length; i++) {
                    if ($scope.getDistanceBetweenKM($scope.circles[i].centre.latitude, $scope.circles[i].centre.longitude, $scope.marker.coords.latitude, $scope.marker.coords.longitude) < $scope.nearRadius) {
                        $scope.CloseUsers += parseInt($scope.circles[i].count);
                    }
                }
            }
            $scope.repaintNearRadius();
        });

        $scope.repaintNearRadius = function repaintNearRadius() {
            var found = false;
            for (var i = 0; i < $scope.circles.length ; i++) {
                if ($scope.circles[i].id == -1) {
                    found = true;
                    $scope.circles[i].centre = {
                        latitude: marker.coords.latitude,
                        longitude: marker.coords.longitude
                    }
                    $scope.circles[i].radius = $scope.nearRadius * 1000;
                }
            }
            if (!found) {
                $scope.circles.push({
                    id: -1,
                    centre: {
                        latitude: marker.coords.latitude,
                        longitude: marker.coords.longitude
                    },
                    radius: $scope.nearRadius * 1000,
                    stroke: {
                        color: '#08B21F',
                        weight: 0,
                        opacity: 0
                    },
                    fill: {
                        color: '#0066CC',
                        weight: 1,
                        opacity: 0.5
                    },
                    count: 0
                });
            }
        };

        $scope.toRadians = function (val) {
            return val * Math.PI / 180;
        };

        $scope.getDistanceBetweenKM = function getDistanceBetweenKM(lat1, lon1, lat2, lon2) {
            var R = 6371; // km
            var phi1 = $scope.toRadians(lat1);
            var phi2 = $scope.toRadians(lat2);
            var deltaPhi = $scope.toRadians(lat2 - lat1);
            var deltaLambda = $scope.toRadians(lon2 - lon1);
            var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
                    Math.cos(phi1) * Math.cos(phi2) *
                    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }

        function mapResize(maps,eventName,args) {
            
        };
        
        var map = {
            zoom: 12,
            bounds: {},
            events: {
                zoom_changed:mapResize
            }
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
            $scope.nearRadius = 5;
        });
    }]);