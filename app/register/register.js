'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope', "$location", "$window", function ($scope, $location, $window) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $scope.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            });
        });
    }
    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };
}]);