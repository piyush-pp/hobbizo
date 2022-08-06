var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
    file: {
        type: String,
        required: true,
    },
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Media = module.exports = mongoose.model('media', mediaSchema);
module.exports.get = function (callback, limit) {
    Media.find(callback).limit(limit); 
}