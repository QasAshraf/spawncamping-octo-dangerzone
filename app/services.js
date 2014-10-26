app.service('UserService', function() {
    this.currentUser = {
            FirstName: 'anonymous',
            LastName: '',
            Interests: []
    };
    this.get = function() {
        return this.currentUser;
    };


    this.save = function(user) {
        this.currentUser = user;
    }
});

app.service('RoomService', function() {
    this.rooms = {
        0 : {
            users: [
                "tom",
                "dick",
                "harry"
            ],
            messageLog: [
                "Hey guys!",
                "Hows it going?"
            ]
        },
        1 : {
            users: [
                "bill",
                "bob",
                "daisy"
            ],
            messageLog: [
                "Howdie",
                "Anyone there?"
            ]
        }
    };

    this.get = function(id) {
      return this.rooms[id];
    };
});

app.service('ConfigService', function () {
    this.config = {
        "api-url": "http://bongo.qasashraf.com/api/"
    };
    this.add = function (key, value) {
        this.config[key] = value;
    };
    this.get = function (key) {
        return this.config[key];
    }
});

app.service("AuthService", ["$http", "$q", "$window", function ($http, $q, $window) {
    this.userInfo = null;

    this.login = function login(username, password) {
        var self = this;
        var deferred = $q.defer();

        $http.post('/api/user/logon', {
            email: username,
            password: password,
            longitude: 1,
            latitude: 1
        }).
          success(function (data, status, headers, config) {
              self.userInfo = data;
              $window.sessionStorage["userInfo"] = data;
          }).
          error(function (data, status, headers, config) {
              console.log("error");
          });

        return deferred.promise;
    };

    this.register = function register(data) {
        self.userInfo = data;
        $window.sessionStorage["userInfo"] = data;
    };

    this.logout = function logout() {
        var deferred = $q.defer();

        this.userInfo = null;
        $window.sessionStorage["userInfo"] = null;

        return deferred.promise;
    };


    this.isLoggedIn = function isLoggedIn() {
        return this.userInfo != null;
    };

    this.getUserInfo = function getUserInfo() {
        return this.userInfo;
    };

    this.init = function init() {
        if ($window.sessionStorage["userInfo"]) {
            this.userInfo = $window.sessionStorage["userInfo"];
        }
    }
}]);
