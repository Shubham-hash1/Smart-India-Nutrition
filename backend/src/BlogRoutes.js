const express = require("express");
const { getBlogs, createBlog, addComment, likeBlog, deleteBlog, updateBlog } = require("./Blogcontroller");
const { protect } = require("./Authmiddleware");

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:id/comments").post(protect, addComment);
router.route("/:id/like").put(likeBlog);

router.route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
