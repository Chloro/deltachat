require('dotenv').load();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var passport = require('passport');
var methodOverride = require('method-override');

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride());

//Allow angular to access all resources within /public
app.use(express.static(path.join(__dirname + '/public')));
app.use(passport.initialize());

//Load the rest of the application.
require(__dirname + '/app/index.js')(app, io, auth);

// Catch unauthorised errors
app.use(function (error, request, response, next) {
    if (error.name === 'UnauthorizedError') {
        response.status(401);
        response.json({'message' : error.name + ': ' + error.message});
    }
});

//Custom middleware to work with SPAs.
app.all('/*', function(req, res, next) {
    // Just send the index.html to support angular HTML5Mode
    res.sendFile('/public/index.html', { root: __dirname });
});

//Connect to mongodb.
mongoose.connect('mongodb://localhost:27017/deltachat', function(error){
    if(error) {
        console.log('Database connection failed. ' + error);
    } else {
        console.log('Connected to the database.');
    }
});

var port;
var baseUri;
if (process.env.NODE_ENV === 'production') {
    port = 80;
    baseUri = 'http://www.deltachat.net';
} else if (process.env.NODE_ENV === 'local') {
    port = 9001;
    baseUri = 'http://localhost:9001';
}

//Start server.
var server = http.listen(port, function () {
    var port = server.address().port;
    var mode = process.env.NODE_ENV;
    if (process.env.NODE_ENV === 'production') {
        console.log('Server started and listening at ' + baseUri + ' in ' + mode + ' mode.');
    } else if (process.env.NODE_ENV === 'local') {
        console.log('Server started and listening at http://localhost:' + port + ' in ' + mode + ' mode.');
    }
});
