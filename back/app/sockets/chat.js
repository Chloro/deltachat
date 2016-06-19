var mongoose = require('mongoose');
var socketioJwt = require('socketio-jwt');
var Post = mongoose.model('Post');
var loggedInUsers = [];

function userAlreadyLoggedIn(loggedInUserList, username) {
    var result = false;
    loggedInUserList.find(function(user){
        if (user === username) {
            result = true;
        }
    });
    return result;
}

module.exports = function(io) {
    io.on('connection', socketioJwt.authorize({
        secret: process.env.JWT_SECRET,
        timeout: 5000
    })).on('authenticated', function(socket){

        Post.find(function(error, posts){
            if(error){
                console.log('Error retrieving posts!');
                throw error;
            }
            Post.populate(posts, {path: 'user'}, function(error, posts){
                if(error){
                    console.log('Error populating retrieved posts!');
                    throw error;
                }
                socket.emit('load-old-posts', posts);
            });
        });

        socket.on('joined-chat', function (username) {
            console.log(username + ' has connected.');
            socket.username = username;
            if (!userAlreadyLoggedIn(loggedInUsers, username)) {
                loggedInUsers.push(username);
            }
            io.emit('logged-in-users', loggedInUsers);
        });

        socket.on('disconnect', function () {
            console.log(socket.username + ' has disconnected.');
            var user = socket.username;
            var index = loggedInUsers.indexOf(user);
            if (index > -1) {
                loggedInUsers.splice(index, 1);
            }
            io.emit('logged-in-users', loggedInUsers);
        });

        socket.on('post', function (newPost) {
            if (newPost.userId && newPost.message) {
                var post = new Post({
                    user: newPost.userId,
                    message: newPost.message
                });
                post.save(function(error){
                    if(error){
                        console.log('Error saving post!');
                        throw error;
                    }
                });

                Post.populate(post, {path: 'user'}, function(error){
                    if(error){
                        console.log('Error populating retrieved posts!');
                        throw error;
                    }
                    console.log('[CHAT]:[' + post.user.username + ']:' + post.message );
                    io.emit('post', post);
                });
            }
        });


    });
};
