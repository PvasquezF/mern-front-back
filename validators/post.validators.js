const { check } = require("express-validator");

module.exports.CreatePostValidations = [
  check("text").optional(false).notEmpty(),
];

module.exports.CreateCommentValidations = [
  check("text").optional(false).notEmpty(),
];
