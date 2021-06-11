const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const {
  CreateUpdateProfileValidations,
} = require("../../validators/profile.validators");
const router = express.Router();

const {
  getMyProfile,
  createUpdateProfile,
} = require("../../controllers/profile.controller");

router.post(
  "/",
  auth,
  validate(CreateUpdateProfileValidations),
  createUpdateProfile
);
router.get("/me", auth, getMyProfile);

module.exports = router;
