var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose  = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'username'
    },
    function(username, password, done){
        User.findOne({
            username: username
            },
            function(error, user){
                if (error) {
                    return done(error);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'The user was not logged in, username doesn\'t exist.'
                    })
                }
                if (!user.validatePassword(password)) {
                    return done(null, false, {
                        message: 'The user was not logged in, incorrect password.'
                    })
                }
                return done(null, user);
            }
        );
    }
));
