const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");

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
