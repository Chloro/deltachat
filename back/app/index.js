module.exports = function(app, io, auth){

    //Load the models
    console.log('Loading models...');
    require(__dirname + '/models/index.js');

    //Load the configuration
    console.log('Loading configuration...');
    require(__dirname + '/configuration/index.js');

    //Load the sockets
    console.log('Loading sockets...');
    require(__dirname + '/sockets/index.js')(io);

    //Load the endpoints
    console.log('Loading endpoints...');
    require(__dirname + '/endpoints/index.js')(app, auth);

};
