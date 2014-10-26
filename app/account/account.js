'use strict';

angular.module('myApp.account', ['ngRoute', 'ngTagsInput'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/account', {
            templateUrl: 'account/account.html',
            controller: 'AccountCtrl',
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
    }])

    .controller('AccountCtrl', ['$scope', 'UserService', '$http', 'ConfigService', function ($scope, UserService, $http, ConfigService)
    {
        console.log(UserService);
        $scope.user = UserService.get();
        $scope.update = function(user) {
            UserService.save(angular.copy(user));
        };

        $scope.loadTags = function (query) {
            return $http.get(ConfigService.get('api-url')+'tag/'+query);
        };
    }]);