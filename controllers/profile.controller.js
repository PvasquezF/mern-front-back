const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const mongoose = require("mongoose");
const request = require("request");

exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);

  return res.status(200).json({
    result: true,
    data: profiles,
  });
});

exports.getProfileByUserId = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.user_id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile) {
    return next(new ErrorResponse([`No existe el perfil solicitado`], 422));
  }
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.user._id,
  }).populate("user", ["name", "avatar"]);

  if (!profile) {
    return next(
      new ErrorResponse([`No existe el perfil para este usuario`], 422)
    );
  }
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.createUpdateProfile = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  let profile = await Profile.findOne({
    user: req.user._id,
  });
  data.user = req.user._id;
  if (!profile) {
    profile = new Profile(data);
  } else {
    profile.overwrite(data);
  }
  profile = await profile.save();
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.deleteProfile = asyncHandler(async (req, res, next) => {
  await Post.deleteMany({ user: req.user._id });
  await Profile.findOneAndRemove({ user: req.user._id });
  await User.findByIdAndRemove({ _id: req.user._id });
  return res.status(200).json({
    result: true,
    data: { message: `Usuario eliminado correctamente.` },
  });
});

exports.updateExperience = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  const profile = await Profile.findOne({
    user: req.user._id,
  });
  for (const exp of data.experience) {
    profile.experience.unshift(exp);
  }
  await profile.save();
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $pull: {
        experience: { _id: req.params.experience_id },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.updateEducation = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  const profile = await Profile.findOne({
    user: req.user._id,
  });
  for (const exp of data.education) {
    profile.education.unshift(exp);
  }
  await profile.save();
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $pull: {
        education: { _id: req.params.education_id },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    result: true,
    data: profile,
  });
});

exports.getGithubData = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const params = [
    `per_page=5`,
    `sort=created:asc`,
    `client_id=${process.env.GITHUB_CLIENTID}`,
    `client_secret=${process.env.GITHUB_CLIENTSECRET}`,
  ].join(`&`);

  const options = {
    uri: `https://api.github.com/users/${username}/repos?${params}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };

  request(options, (error, response, body) => {
    if (error) {
      return next(error);
    }
    if (response.statusCode !== 200) {
      return next(
        new ErrorResponse([`No se ha encontrado el perfil ingresado.`], 404)
      );
    }
    return res.status(200).json({
      result: true,
      data: JSON.parse(body),
    });
  });
});
