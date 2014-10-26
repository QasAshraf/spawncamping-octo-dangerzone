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
        var messagesReverse = [
            {
                "chatroomid": "1",
                "fk_deviceid": "8",
                "fk_locationid": "13",
                "timestamp": "87979",
                "message": "Hello Bobby. ",
                "iddevice": "8",
                "fk_iduser": "8",
                "friendly_name": "phone",
                "api_key": "KEY1",
                "lat": "11.1323",
                "lon": "45.253",
                "iduser": "8",
                "email": "user@mail.com",
                "password": "dsfsfhbk",
                "firstname": null,
                "lastname": null,
                "radiuspref": null
            },
            {
                "chatroomid": "2",
                "fk_deviceid": "9",
                "fk_locationid": "13",
                "timestamp": "57475",
                "message": "Hello Reply",
                "iddevice": "9",
                "fk_iduser": "9",
                "friendly_name": "PHONE2",
                "api_key": "KEY2",
                "lat": "11.1323",
                "lon": "45.253",
                "iduser": "9",
                "email": "bob@mail.com",
                "password": "",
                "firstname": "bob",
                "lastname": "lob",
                "radiuspref": null
            }
        ];
        $scope.messages =  messagesReverse.slice().reverse();


        $scope.send = function (message) {
            if (message != '') {
                $scope.messages.push({
                    "timestamp":  Date.now(),
                    "message": message,
                    "firstname": "steph"
                });
                $scope.message = '';
            }
        }
    }]);
