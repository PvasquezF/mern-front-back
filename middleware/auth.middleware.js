const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      result: false,
      errors: [`Token no ingresado`],
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return next(new ErrorResponse([`Token invalido`], 401));
  }
};
