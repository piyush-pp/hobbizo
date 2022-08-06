const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

router.get("/", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome to media router",
  });
});

var mediaStorage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'images/media')
},
filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
}
})
  
var mediaImage = multer({ storage: mediaStorage });

var MediaControllers = require("../../controllers/app/Media");
router.post('/media_upload', mediaImage.single('file'), (req, res, next) => {
    MediaControllers.MediaUpload(req, (result) => {
        res.send(result);
    })
});
router.route("/media_list")
    .post(MediaControllers.MediaList);
router.route("/media_delete")
    .post(MediaControllers.DeleteMedia);

// Common Routes
router.get('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Get Request" }) });
router.post('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Post Request" }) });

module.exports = router;
