var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = function(app, auth) {

    //Get all posts
    app.get('/api/posts', auth, function(request, response){
        Post.find(function(error, posts){
            Post.populate(posts, {path: 'user'}, function(error, posts){
                response.send(posts);
            });
        });
    });

    //Get posts by user id
    app.get('/api/posts/:userId', auth, function(request, response){
        Post.find({user: request.params.userId}, function(error, posts){
            if(error){
                error.message = 'Failed to find post.';
                error.status = 'Failure';
                response.status(400);
                response.send(error);
            } else if (posts.length > 0){
                Post.populate(posts, {path: 'user'}, function(error, posts){
                    response.send(posts);
                });
            } else {
                error = new Error();
                error.message = 'That user has no posts!';
                error.status = 'Failure';
                response.status(404);
                response.send(error);
            }
        });
    });

    //Delete post by id
    app.delete('/api/posts/:postId', auth, function(request, response){
        Post.findByIdAndRemove(request.params.postId, function(error, foundPost){
            if(error){
                error.message = 'The post was not deleted.';
                error.status = 'Failure';
                response.status(400);
                response.send(error);
            } else if (foundPost) {
                var responseObject = {
                    message: 'The post was successfully deleted!',
                    status: 'Success',
                    action: 'Delete',
                    timestamp: new Date(),
                    deletedPost: foundPost
                };
                response.send(responseObject);
            } else {
                error = new Error();
                error.message = 'The post was not deleted. Does not exist!';
                error.status = 'Failure';
                response.status(404);
                response.send(error);
            }
        });
    });

    //Post a new post
    app.post('/api/posts/:userId', auth, function(request, response){
        var post = new Post({
            user: request.params.userId,
            message: request.body.message,
            time: new Date()
        });
        post.save(function(error, post){
            if(error){
                error.message = 'The post was not created.';
                error.status = 'Failure';
                response.status(400);
                response.send(error);
            } else {
                var responseObject = {
                    message: 'The post was successfully created!',
                    status: 'Success',
                    action: 'Post',
                    timestamp: new Date(),
                    post: post
                };
                response.send(responseObject);
            }
        });
    });
};
