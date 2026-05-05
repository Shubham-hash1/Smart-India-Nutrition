const express = require("express");
const { getBlogs, createBlog, addComment, likeBlog } = require("./Blogcontroller");
const { protect } = require("./Authmiddleware");

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:id/comments").post(protect, addComment);
router.route("/:id/like").put(likeBlog);

module.exports = router;
