'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope', "$http", function ($scope, $http) {
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

    $scope.submit = function myfunction() {
        $http.post('/api/user/register',{
            email: $scope.userName,
            password: $scope.password,
            longitude: $scope.userLocation.longitude,
            latitude: $scope.userLocation.latitude,
            firstname: $scope.FName,
            lastname: $scope.LName
        }).
          success(function (data, status, headers, config) {
              console.log("success");
          }).
          error(function (data, status, headers, config) {
              console.log("error");
          });
    };

    
}]);