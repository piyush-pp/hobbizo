const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

router.get("/", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome to user router",
  });
});

var profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/profile')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
    
var profileImage = multer({ storage: profileStorage });

var UsersControllers = require("../../controllers/app/Users");
router.post('/profile_update', profileImage.single('profile'), (req, res, next) => {
  UsersControllers.UpdateProfile(req, (result) => {
    res.send(result);
  })
});
router.route("/validate_phone")
  .post(UsersControllers.ValidatePhone);  
router.route("/validate_email")
  .post(UsersControllers.ValidateEmail);  
router.route("/phone_login")
  .post(UsersControllers.PhoneLogin);  
router.route("/social_login")
  .post(UsersControllers.SocialLogin);   
router.route("/users_list")
  .post(UsersControllers.UsersList);
router.route("/user_details")
  .post(UsersControllers.UserDetails);
router.route("/update_latlong")
  .post(UsersControllers.UpdateLatLong);
router.route("/update_user_details")
  .post(UsersControllers.UpdateUserDetails);

  // Common Routes
  router.get('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Get Request" }) });
  router.post('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Post Request" }) });

module.exports = router;
