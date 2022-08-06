const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome to favourite router",
  });
});

var FavouriteControllers = require("../../controllers/app/Favourite");
router.route("/add_favourite")
  .post(FavouriteControllers.AddFavourite);
router.route("/delete_favourite")
  .post(FavouriteControllers.DeleteFavourite);
router.route("/is_checked_favourite")
  .post(FavouriteControllers.isCheckedFavourite);
router.route("/list_of_favourite")
  .post(FavouriteControllers.ListOfFavourite);


  // Common Routes
  router.get('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Get Request" }) });
  router.post('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Post Request" }) });

module.exports = router;
