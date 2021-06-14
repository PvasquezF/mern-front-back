const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const ErrorResponse = require("../utils/ErrorResponse");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

exports.getAllPost = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });
  return res.status(200).json({
    result: true,
    data: posts,
  });
});

exports.getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid);
  if (!post) {
    return next(
      new ErrorResponse([`No se ha encontrado el post solicitado`], 404)
    );
  }
  return res.status(200).json({
    result: true,
    data: post,
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const data = matchedData(req);
  const user = req.user;
  let post = new Post({
    user: user._id,
    name: user.name,
    avatar: user.avatar,
    text: data.text,
  });
  post = await post.save();

  return res.status(200).json({
    result: true,
    data: post,
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid);
  if (!post) {
    return next(new ErrorResponse([`El post a eliminar no existe`], 422));
  } else if (post.user.toString() !== req.user._id) {
    return next(
      new ErrorResponse(
        [`El usuario no tiene permisos para eliminar este post`],
        401
      )
    );
  }
  await post.remove();
  return res.status(200).json({
    result: true,
    data: { message: `Post eliminado correctamente.` },
  });
});
