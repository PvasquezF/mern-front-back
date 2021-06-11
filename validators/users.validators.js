const { check } = require("express-validator");

module.exports.CreateUserValidations = [
  check("name")
    .optional(false)
    .isString()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("El nombre ingresado no es valido."),
  check("email")
    .optional(false)
    .isEmail()
    .withMessage("El correo electronico ingresado no es valido."),
  check("password")
    .optional(false)
    .isString()
    .isLength({ min: 6 })
    .withMessage("La contraseña ingresada no tiene el tamaño requerido.")
];
