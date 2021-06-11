const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const {
  CreateUpdateProfileValidations,
} = require("../../validators/profile.validators");
const router = express.Router();

const {
  getProfiles,
  getMyProfile,
  getProfileByUserId,
  createUpdateProfile,
} = require("../../controllers/profile.controller");

router
  .get("/", auth, getProfiles)
  .post(
    "/",
    auth,
    validate(CreateUpdateProfileValidations),
    createUpdateProfile
  );
router.get("/me", auth, getMyProfile);
router.get("/user/:user_id", auth, getProfileByUserId);

module.exports = router;
