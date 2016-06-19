module.exports = function(app, auth){
    require('./users')(app, auth);
    require('./posts')(app, auth);
};