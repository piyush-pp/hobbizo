var mongoose = require("mongoose");
var usersSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  profile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  dialCode: {
    type:String,
    require:true
  },
  gender: {
    type: String,
    require: true,
  },
  date_of_birth: {
    type: String,
    require: true,
  },
  hobbies: [
    {type: mongoose.Schema.Types.ObjectId,
       ref:'hobbies',
       required:true}
      ],
  latLong: {
    type: Object,
    require: true,
  },
  os: {
    type: String,
    require: true,
  },
  fcm_token: {
    type: String,
    require: true,
  },
  device_uid: {
    type: String,
    require: true,
  },
  login_source: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
var Users = (module.exports = mongoose.model("users", usersSchema));
module.exports.get = function (callback, limit) {
  Users.find(callback).limit(limit);
};
