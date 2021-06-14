const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const {
  CreateUpdateProfileValidations,
  ExperienceProfileValidations,
  EducationProfileValidations,
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
  updateEducation,
  deleteEducation,
  getGithubData
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
router
  .put(
    "/education",
    auth,
    validate(EducationProfileValidations),
    updateEducation
  )
  .delete("/education/:education_id", auth, deleteEducation);
router.get("/github/:username", getGithubData);
router.get("/user/:user_id", auth, getProfileByUserId);

module.exports = router;
