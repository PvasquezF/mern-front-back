const { check } = require("express-validator");

module.exports.CreateUpdateProfileValidations = [
  check("status").optional(false).notEmpty(),
  check("skills")
    .optional(false)
    .notEmpty()
    .customSanitizer((skills) => {
      return skills.split(",").map((skill) => skill.trim());
    }),
  check("company").optional(true).notEmpty(),
  check("website").optional(true).notEmpty(),
  check("location").optional(true).notEmpty(),
  check("bio").optional(true).notEmpty(),
  check("status").optional(true).notEmpty(),
  check("githubusername").optional(true).notEmpty(),
  check("social.youtube").optional(true).notEmpty(),
  check("social.twitter").optional(true).notEmpty(),
  check("social.facebook").optional(true).notEmpty(),
  check("social.linkedin").optional(true).notEmpty(),
  check("social.instagram").optional(true).notEmpty(),
];

module.exports.ExperienceProfileValidations = [
  check("experience.*.title").optional(false).notEmpty(),
  check("experience.*.company").optional(false).notEmpty(),
  check("experience.*.location").optional(true).notEmpty(),
  check("experience.*.from").optional(false).notEmpty(),
  check("experience.*.to").optional(true),
  check("experience.*.current").optional(true).notEmpty(),
  check("experience.*.description").optional(true).notEmpty(),
];

module.exports.EducationProfileValidations = [
  check("education.*.school").optional(false).notEmpty(),
  check("education.*.degree").optional(false).notEmpty(),
  check("education.*.fieldofstudy").optional(false).notEmpty(),
  check("education.*.from").optional(false).notEmpty(),
  check("education.*.to").optional(true),
  check("education.*.current").optional(true).notEmpty(),
  check("education.*.description").optional(true).notEmpty(),
];
