const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

router.get("/", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome to hobbies router",
  });
});

var hobbiesStorage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'images/hobbies')
},
filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
}
})
  
var hobbiesImage = multer({ storage: hobbiesStorage });

var HobbiesControllers = require("../../controllers/app/Hobbies");
router.post('/add_hobbies_category', hobbiesImage.single('image'), (req, res, next) => {
    HobbiesControllers.AddHobbiesCategory(req, (result) => {
        res.send(result);
    })
});
router.route("/hobbies_category_list")
    .post(HobbiesControllers.HobbiesCategoryList);
router.route("/delete_hobbies")
    .post(HobbiesControllers.DeleteHobbies);
router.post('/add_hobbies', hobbiesImage.single('image'), (req, res, next) => {
    HobbiesControllers.AddHobbies(req, (result) => {
        res.send(result);
    })
});
router.route("/hobbies_list")
    .post(HobbiesControllers.HobbiesList);


// Common Routes
router.get('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Get Request" }) });
router.post('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Post Request" }) });

module.exports = router;
