const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");

exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);

  return res.status(200).json({
    result: true,
    data: profiles,
  });
});

exports.getProfileByUserId = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .catch((e) => {
      if (e.kind === "ObjectId") {
        return next(new ErrorResponse([`No existe el perfil solicitado`], 422));
      } else {
        return next(e);
      }
    });
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
    }
  );
  return res.status(200).json({
    result: true,
    data: profile,
  });
});
