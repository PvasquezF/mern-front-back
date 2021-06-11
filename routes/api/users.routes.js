const express = require("express");
const validate = require("../../middleware/validator.middleware");
const { CreateUserValidations } = require("../../validators/users.validators");
const router = express.Router();

const { getUsers, postUser } = require("../../controllers/users.controller");

router.get("/", getUsers).post("/", validate(CreateUserValidations), postUser);

module.exports = router;
