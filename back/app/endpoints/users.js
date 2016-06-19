var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app, auth) {

    //Get all users
    app.get('/api/users', auth, function(request, response){
        User.find(function(error, users){
            response.send(users);
        });
    });

    //Get user by id
    app.get('/api/users/:userId', auth, function(request, response){
        User.find({_id: request.params.userId}, function(error, user){
            response.send(user);
        });
    });

    //Delete user by id
    app.delete('/api/users/:userId', auth, function(request, response){
        User.findByIdAndRemove(request.params.userId, function(error, foundUser){
            if(error){
                error.message = 'The user was not deleted.';
                error.status = 'Failure';
                response.status(400);
                response.send(error);
            } else if (foundUser) {
                var responseObject = {
                    message: 'The user was successfully deleted!',
                    status: 'Success',
                    action: 'Delete',
                    timestamp: new Date(),
                    deletedUser: foundUser
                };
                response.send(responseObject);
            } else {
                error = new Error();
                error.message = 'The user was not deleted. Does not exist!';
                error.status = 'Failure';
                response.status(404);
                response.send(error);
            }
        });
    });

    //Register a new user
    app.post('/api/register', function(request, response){
        if(!request.body.firstname || !request.body.lastname ||
            !request.body.password || !request.body.email || !request.body.username) {
            var error = new Error();
            error.message = 'The user was not created. All fields are required!';
            error.status = 'Failure';
            response.status(400);
            response.send(error);
         }
        var user = new User();
        user.email = request.body.email;
        user.firstname = request.body.firstname;
        user.lastname = request.body.lastname;
        user.username = request.body.username;
        user.setPassword(request.body.password);
        User.find({username: user.username}, function(error, foundUsers){
            if (foundUsers.length) {
                error = new Error();
                error.message = 'The user was not created. Already exists!';
                error.status = 'Failure';
                response.status(422);
                response.send(error);
            } else {
                var userToken;
                user.save(function(error, user){
                    if(error){
                        error.message = 'The user was not created.';
                        error.status = 'Failure';
                        response.status(400);
                        response.send(error);
                    } else {
                        userToken = user.generateToken();
                        var responseObject = {
                            message: 'The user was successfully created!',
                            status: 'Success',
                            action: 'Post',
                            timestamp: new Date(),
                            token: userToken
                        };
                        response.status(201);
                        response.send(responseObject);
                    }
                });
            }
        });
    });

    //Log a user in
    app.post('/api/login', function(request, response){
        if(!request.body.username || !request.body.password) {
            var error = new Error();
            error.message = 'The user was not created. All fields are required!';
            error.status = 'Failure';
            response.status(400);
            response.json(error);
        }

        passport.authenticate('local', function(error, user, info){
            var userToken;
            if (error) {
                error.message = 'The user was not logged in. Invalid username or password.';
                error.status = 'Failure';
                response.status(404);
                response.json(error);
            }
            if(user){
                userToken = user.generateToken();
                var responseObject = {
                    message: 'The user was successfully logged in!',
                    status: 'Success',
                    action: 'Post',
                    timestamp: new Date(),
                    token: userToken
                };
                response.status(200);
                response.json(responseObject);
            } else {
                var error = new Error();
                error.message = info.message;
                error.status = 'Failure';
                response.status(401);
                response.json(error);
            }
        })(request, response);

    });

    //Update user by id
    app.put('/api/users/:userId', auth, function(request, response){
        User.findOne({_id: request.params.userId}, function(error, foundUser){
            if (request.body.username) {
                foundUser.username = request.body.username;
            }
            if (request.body.firstname) {
                foundUser.firstname = request.body.firstname;
            }
            if (request.body.lastname) {
                foundUser.lastname = request.body.lastname;
            }
            if (request.body.email) {
                foundUser.email = request.body.email;
            }
            if (request.body.password) {
                foundUser.password = request.body.password;
            }
            foundUser.save(function(error, updatedUser){
                var responseObject = {
                    status: 'Success!',
                    action: 'Put',
                    timestamp: new Date(),
                    data: updatedUser
                };
                response.send(responseObject);
            });
        });
    });
};
