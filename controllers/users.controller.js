const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User.model");
const gravatar = require("gravatar");
const GenerateToken = require("../utils/GenerateToken");

exports.getUsers = asyncHandler((req, res, next) => {
  res.status(200).json({
    msg: `Mensaje`,
  });
});

exports.postUser = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  let user = await User.findOne({ email: data.email });
  if (user) {
    return next(
      new ErrorResponse(
        [`El correo electronico ingresado ya ha sido registrado`],
        422
      )
    );
  }

  const avatar = gravatar.url(data.email, { s: "200", r: "pg", d: "mm" });
  user = new User({ ...data, avatar });
  const token = GenerateToken({ user });
  if (!token) {
    return next(
      new ErrorResponse(
        [`Ha ocurrido un error al intentar generar el token.`],
        422
      )
    );
  }
  user.save();
  return res.status(200).json({
    result: true,
    data: { user, token },
  });
});
