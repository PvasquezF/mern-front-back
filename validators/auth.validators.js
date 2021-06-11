const { check } = require("express-validator");

module.exports.LoginValidations = [
  check("email")
    .optional(false)
    .isEmail()
    .withMessage("El correo electronico ingresado no es valido."),
  check("password").optional(false).isString().notEmpty(),
];
