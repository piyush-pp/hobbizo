var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
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
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"room"
    },
    status: {
        type: String,
        required: true,
    },
    updated_at:{
        type: Date,
        default: Date.now,
        require: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Chat = module.exports = mongoose.model('chat', chatSchema);
module.exports.get = function (callback, limit) {
    Chat.find(callback).limit(limit); 
}