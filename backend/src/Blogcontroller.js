const { pool } = require("./Db");

// ────────────────────────────────────────
// @desc    Get all blogs with comments
// @route   GET /api/blogs
// @access  Public
// ────────────────────────────────────────
const getBlogs = async (req, res, next) => {
  try {
    const query = `
      SELECT 
        b.id, b.user_id, b.title, b.content, b.likes, b.created_at, u.name as author_name,
        COALESCE(
          (SELECT json_agg(
            json_build_object(
              'id', c.id, 
              'content', c.content, 
              'created_at', c.created_at, 
              'author_name', cu.name
            ) ORDER BY c.created_at ASC
          )
           FROM comments c 
           JOIN users cu ON c.user_id = cu.id 
           WHERE c.blog_id = b.id), '[]'
        ) as comments
      FROM blogs b
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC;
    `;
    const result = await pool.query(query);
    res.status(200).json({
      success: true,
      blogs: result.rows,
    });
  } catch (error) {
    next(error);
  }};

// ────────────────────────────────────────
// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
// ────────────────────────────────────────
const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }
    const userId = req.user.id;
    const result = await pool.query(
      "INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );
    // Fetch the author name to append to the response
    const authorResult = await pool.query("SELECT name FROM users WHERE id = $1", [userId]);
    const newBlog = {
      ...result.rows[0],
      author_name: authorResult.rows[0].name,
      comments: [],
      likes: 0
    };
    res.status(201).json({
      success: true,
      blog: newBlog,
    });
  } catch (error) {
    next(error);
  }};

// ────────────────────────────────────────
// @desc    Add a comment to a blog
// @route   POST /api/blogs/:id/comments
// @access  Private
// ────────────────────────────────────────
const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;
    const userId = req.user.id;
    if (!content) {
      return res.status(400).json({ success: false, message: "Comment content is required." });
    }
    const result = await pool.query(
      "INSERT INTO comments (content, blog_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [content, blogId, userId]
    );
    const authorResult = await pool.query("SELECT name FROM users WHERE id = $1", [userId]);
    const newComment = {
      id: result.rows[0].id,
      content: result.rows[0].content,
      created_at: result.rows[0].created_at,
      author_name: authorResult.rows[0].name
    };
    res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }};

// ────────────────────────────────────────
// @desc    Like a blog
// @route   PUT /api/blogs/:id/like
// @access  Public
// ────────────────────────────────────────
const likeBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const result = await pool.query(
      "UPDATE blogs SET likes = likes + 1 WHERE id = $1 RETURNING likes",
      [blogId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    res.status(200).json({
      success: true,
      likes: result.rows[0].likes,
    });
  } catch (error) {
    next(error);
  }
};


const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    // Check if the blog exists and belongs to the user
    const result = await pool.query(
      "DELETE FROM blogs WHERE id = $1 AND user_id = $2 RETURNING id",
      [blogId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this blog or blog not found." });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBlogs, createBlog, addComment, likeBlog, deleteBlog };


