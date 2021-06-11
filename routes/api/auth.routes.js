const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const { LoginValidations } = require("../../validators/auth.validators");
const router = express.Router();

const { getAuth, postAuth } = require("../../controllers/auth.controller");

router.get("/", auth, getAuth).post("/", validate(LoginValidations), postAuth);

module.exports = router;
