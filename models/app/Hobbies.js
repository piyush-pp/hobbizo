var mongoose = require('mongoose');

var hobbiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true,
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hobbies"
    },
    isParent: {
        type: Boolean,
        require: true
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

var Hobbies = module.exports = mongoose.model('hobbies', hobbiesSchema);
module.exports.get = function (callback, limit) {
    Hobbies.find(callback).limit(limit); 
}