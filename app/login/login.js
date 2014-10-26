'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope', "$location", "$window", "AuthService", function ($scope, $location, $window, AuthService) {
    $scope.userInfo = null;
    $scope.login = function () {
        AuthService.login($scope.userName, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;
                $location.path("/");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };
}]);