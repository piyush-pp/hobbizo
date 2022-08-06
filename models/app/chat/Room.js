var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    room_id: {
        type: String,
        required: true,
    },
    chat:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    }],
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

var Room = module.exports = mongoose.model('room', roomSchema);
module.exports.get = function (callback, limit) {
    Room.find(callback).limit(limit); 
}