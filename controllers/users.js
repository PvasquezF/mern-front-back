const asyncHandler = require("express-async-handler");

exports.getUsers = asyncHandler((req, res, next) => {
  res.status(200).json({
    msg: `Mensaje`,
  });
});
