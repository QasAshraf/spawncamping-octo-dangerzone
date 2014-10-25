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