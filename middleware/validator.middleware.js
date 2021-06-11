const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const result = validationResult(req);
    const errors = [];
    if (!result.isEmpty()) {
      result.array().map((error) => {
        if (error.msg.includes(`Cannot read property 'match' of undefined`)) {
          errors.push(`El campo ${error.param} es obligatorio.`);
        } else if (
          error.msg.includes(`Invalid value`) &&
          error.value === undefined
        ) {
          errors.push(`El campo ${error.param} es obligatorio.`);
        } else if (
          error.msg.includes(`Invalid value`) &&
          error.value !== undefined
        ) {
          errors.push(`El campo ${error.param} tiene un valor no valido.`);
        } else {
          errors.push(`${error.msg} en el campo ${error.param}`);
        }
      });
      return next(new ErrorResponse(errors, 422));
    }
    return next();
    // const mappedErrors = errors.array().map((e) => e.msg);
    // res.status(400).json({ result: false, errors: mappedErrors });
  };
};

module.exports = validate;
