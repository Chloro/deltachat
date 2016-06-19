var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        maxlength: 200,
        required: true
    },
    time: {
        type: Date,
        required: true, default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Post', postSchema);