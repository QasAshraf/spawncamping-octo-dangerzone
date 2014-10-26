'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard',
    'myApp.account',
    'myApp.room',
    'myApp.login',
    'myApp.register',
    'snap'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }]);

app.run(["$rootScope", "$location", "AuthService", function ($rootScope, $location, AuthService) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
    });

    AuthService.init();

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}])
    .controller('mainController', ['AuthService', "$location", '$scope', function (AuthService, $location, $scope) {
        $scope.loggedin = AuthService.isLoggedIn();
        $scope.logout = function () {
            AuthService.logout();
            $location.path("/");
            $scope.loggedin = AuthService.isLoggedIn();
        }

    }])
    .controller('chatController', ['$scope', function ($scope) {
        $scope.messages = [{
            "chatroomid": "1",
            "fk_deviceid": "8",
            "fk_locationid": "13",
            "timestamp": "87979",
            "message": "Hello Bobby. "
        }, {
            "chatroomid": "2",
            "fk_deviceid": "9",
            "fk_locationid": "13",
            "timestamp": "57475",
            "message": "Hello Reply"
        }];

        $scope.send = function (message) {
            $scope.messages.push({
                "chatroomid": "1",
                "fk_deviceid": "8",
                "fk_locationid": "13",
                "timestamp": "87979",
                "message": message
            });
            $scope.message = '';
        }
    }]);
