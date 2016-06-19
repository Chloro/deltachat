var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, minlength: 6, maxlength: 32, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    salt: {type: String},//, select: false},
    hash: {type: String}//, select: false}
}, {
    versionKey: false
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateToken = function() {
    var expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        exp: parseInt(expiration.getTime() / 1000)
    }, process.env.JWT_SECRET);

};

module.exports = mongoose.model('User', userSchema);