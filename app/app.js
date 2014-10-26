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
    .controller('chatController', ['$scope', 'AuthService', '$http', '$timeout', function ($scope, AuthService, $http, $timeout) {
        $scope.messages = [{"message": "Loading..."}];

        $http.get('/api/messages/' + AuthService.getUserInfo(), {}).
            success(function (data) {
                if (data) {
                    $scope.messages = data.slice().reverse();
                } else {
                    $scope.messages = [];
                }
            }).
            error(function (data, status, headers, config) {
                console.log("error");
            });

        var poll = function() {
            $timeout(function() {
                $http.get('/api/messages/' + AuthService.getUserInfo(), {}).
                    success(function (data) {
                        if (data) {
                            $scope.messages = data.slice().reverse();
                        } else {
                            $scope.messages = [];
                        }
                    }).
                    error(function (data, status, headers, config) {
                        console.log("error");
                    });
                poll();
            }, 10000);
        };
        poll();

        $scope.send = function (message) {
            if (message != '') {
                $http.post('/api/messages',
                    {
                        "api_key": AuthService.getUserInfo(),
                        "message": message
                    }

                ).
                    success(function (data, status, headers, config) {
                        $scope.messages.push({
                            "timestamp":  Date.now(),
                            "message": message,
                            "firstname": "steph"
                        });
                        $scope.message = '';
                    }).
                    error(function (data, status, headers, config) {
                        console.log("error");
                        self.isLive = false
                    });
            }
        }
    }]);
