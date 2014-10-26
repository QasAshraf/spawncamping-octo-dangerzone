app.service('UserService', ['$http', '$window', function($http, $window) {
    this.currentUser = {
            firstname: '',
            lastname: '',
            email: '',
            tags: [],
            token: null
    };
    if ($window.sessionStorage["userInfo"] != null) {
        this.currentUser = $window.sessionStorage["userInfo"];
    }
    this.isLive = false;
    this.get = function() {
        var self = this;
        if (!this.isLive) {
            console.log(this.currentUser.token.api_key);
            $http.get('/api/user/'+self.currentUser.token.api_key, {}).
                success(function (data) {
                    self.currentUser = data.user;
                    self.isLive = true;
                }).
                error(function (data, status, headers, config) {
                    console.log("error");
                    self.isLive = false;
                });
        }
        return this.currentUser;
    };

    this.save = function(user) {
        var self = this;
        $http.put('/api/user',
            user
        ).
        success(function (data, status, headers, config) {
            self.currentUser = user;
        }).
        error(function (data, status, headers, config) {
            console.log("error");
            self.isLive = false
        });


    }
}]);

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

app.service("AuthService", ["$http", "$q", "$window", "UserService", function ($http, $q, $window, UserService) {
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
              UserService.currentUser.email = username;
              UserService.currentUser.token = data;
              self.userInfo = data;
              $window.sessionStorage["userInfo"] = UserService.currentUser;
          }).
          error(function (data, status, headers, config) {
              console.log("error");
          });

        return deferred.promise;
    };

    this.register = function register(data, username) {
        UserService.currentUser.email = username;
        UserService.currentUser.token = data;
        $window.sessionStorage["userInfo"] = UserService.currentUser;
    };

    this.logout = function logout() {
        var deferred = $q.defer();

        this.userInfo = null;
        $window.sessionStorage["userInfo"] = null;

        return deferred.promise;
    };


    this.isLoggedIn = function isLoggedIn() {
        return this.getUserInfo() != null;
    };

    this.getUserInfo = function getUserInfo() {
        this.userInfo = $window.sessionStorage["userInfo"];
        return $window.sessionStorage["userInfo"];
    };

    this.init = function init() {
        if ($window.sessionStorage["userInfo"]) {
            this.userInfo = $window.sessionStorage["userInfo"];
        }
    }
}]);
