app.factory('groupFactory', ['$http', function ($http) {
    var url = "/tagchat-api/current/examples/location.json"
    var dataFactory = {};
    dataFactory.getGroups = function () {
        return $http.get(url);
    };
    return dataFactory;
}]);


app.factory("AuthService", ["$http", "$q", "$window", function ($http, $q, $window) {
    var url = "/tagchat-api/current/examples/location.json";
    var userInfo;

    function login(username, password) {
        var deferred = $q.defer();

        $http.post('/api/user/logon', {
            email: username,
            password: password,
            longitude: 1,
            latitude: 1
        }).
          success(function (data, status, headers, config) {
              console.log(data);
              userInfo = data;
              $window.sessionStorage["userInfo"] = data;
          }).
          error(function (data, status, headers, config) {
              console.log("error");
          });

        return deferred.promise;
    };

    function logout() {
        var deferred = $q.defer();


        return deferred.promise;
    }


    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };
    
}]);
