const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const {
  CreateUpdateProfileValidations,
  ExperienceProfileValidations,
} = require("../../validators/profile.validators");
const router = express.Router();

const {
  getProfiles,
  getMyProfile,
  getProfileByUserId,
  createUpdateProfile,
  deleteProfile,
  updateExperience,
  deleteExperience,
} = require("../../controllers/profile.controller");

router
  .get("/", auth, getProfiles)
  .post(
    "/",
    auth,
    validate(CreateUpdateProfileValidations),
    createUpdateProfile
  )
  .delete("/", auth, deleteProfile);
router.get("/me", auth, getMyProfile);
router
  .put(
    "/experience",
    auth,
    validate(ExperienceProfileValidations),
    updateExperience
  )
  .delete("/experience/:experience_id", auth, deleteExperience);
router.get("/user/:user_id", auth, getProfileByUserId);

module.exports = router;
