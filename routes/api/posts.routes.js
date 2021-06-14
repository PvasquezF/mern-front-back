const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const {
  CreatePostValidations,
  CreateCommentValidations,
} = require("../../validators/post.validators");
const router = express.Router();

const {
  getAllPost,
  getPostById,
  createPost,
  deletePost,
  likePost,
  dislikePost,
  createComment,
  deleteComment
} = require("../../controllers/post.controller");

router
  .get("/", auth, getAllPost)
  .post("/", auth, validate(CreatePostValidations), createPost)
  .put("/like/:postid", auth, likePost)
  .put("/dislike/:postid", auth, dislikePost)
  .put(
    "/comment/:postid",
    auth,
    validate(CreateCommentValidations),
    createComment
  )
  .put("/uncomment/:postid/:commentid", auth, deleteComment)
  .get("/:postid", auth, getPostById)
  .delete("/:postid", auth, deletePost);

module.exports = router;
