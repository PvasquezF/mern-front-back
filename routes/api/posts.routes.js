const express = require("express");
const validate = require("../../middleware/validator.middleware");
const auth = require("../../middleware/auth.middleware");
const { CreatePostValidations } = require("../../validators/post.validators");
const router = express.Router();

const {
  getAllPost,
  getPostById,
  createPost,
  deletePost,
} = require("../../controllers/post.controller");

router
  .get("/", auth, getAllPost)
  .post("/", auth, validate(CreatePostValidations), createPost)
  .get("/:postid", auth, getPostById)
  .delete("/:postid", auth, deletePost);

module.exports = router;
