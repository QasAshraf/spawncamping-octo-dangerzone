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