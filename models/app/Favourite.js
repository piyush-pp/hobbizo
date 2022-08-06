var mongoose = require("mongoose");

var favouriteSchema = mongoose.Schema({
  me: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  you: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

var Favourite = (module.exports = mongoose.model("favourites", favouriteSchema));
module.exports.get = function (callback, limit) {
    Favourite.find(callback).limit(limit);
};
