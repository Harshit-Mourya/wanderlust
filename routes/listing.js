const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
