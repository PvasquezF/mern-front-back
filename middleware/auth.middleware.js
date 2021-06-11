const jwt = require("jsonwebtoken");

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
    return res.status(401).json({
      result: false,
      errors: [`Token invalido`],
    });
  }
};
