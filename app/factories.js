app.factory('groupFactory', ['$http', function ($http) {
    var url = "/tagchat-api/current/examples/location.json"
    var dataFactory = {};
    dataFactory.getGroups = function () {
        return $http.get(url);
    };
    return dataFactory;
}]);


