app.factory('groupFactory', ['$http', function ($http) {
    var url = "/api/location"
    var dataFactory = {};
    dataFactory.getGroups = function () {
        return $http.get(url);
    };
    return dataFactory;
}]);


