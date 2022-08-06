var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    me: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"users"
    },
    you: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"users"
    },
    message: {
        type: String,
        required: true,
    },
    content_type:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Message = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit); 
}