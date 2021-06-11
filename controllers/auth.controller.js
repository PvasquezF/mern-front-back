const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");
const GenerateToken = require("../utils/GenerateToken");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

exports.getAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return next(new ErrorResponse([`El usuario no existe`], 422));
  }
  return res.status(200).json({
    result: true,
    data: user,
  });
});

exports.postAuth = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  let user = await User.findOne({ email: data.email });
  if (!user) {
    return next(new ErrorResponse([`Credenciales incorrectas.`], 422));
  }

  const pass = await bcryptjs.compare(data.password, user.password);

  if (!pass) {
    return next(new ErrorResponse([`Credenciales incorrectas.`], 422));
  }

  const token = GenerateToken({ user });
  if (!token) {
    return next(
      new ErrorResponse(
        [`Ha ocurrido un error al intentar generar el token.`],
        422
      )
    );
  }

  return res.status(200).json({
    result: true,
    data: { user, token },
  });
});
