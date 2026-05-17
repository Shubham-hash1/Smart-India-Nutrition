import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';

const Blogs = () => {
  const { user, token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Post State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  
  // Comment State
  const [commentInputs, setCommentInputs] = useState({});

  // Likes State (local storage for anonymous users)
  const [likedPosts, setLikedPosts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('likedPosts') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/blogs');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsPosting(true);
    try {
      const res = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      const data = await res.json();
      if (data.success) {
        setBlogs([data.blog, ...blogs]);
        setTitle('');
        setContent('');
        setShowPostForm(false);
      }
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleAddComment = async (e, blogId) => {
    e.preventDefault();
    const commentContent = commentInputs[blogId];
    if (!commentContent || !commentContent.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentContent })
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        setBlogs(blogs.map(blog => {
          if (blog.id === blogId) {
            return { ...blog, comments: [...blog.comments, data.comment] };
          }
          return blog;
        }));
        // Clear input
        setCommentInputs({ ...commentInputs, [blogId]: '' });
      }
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  const handleLike = async (blogId) => {
    if (likedPosts.includes(blogId)) return;

    try {
      // Optimistic update
      setBlogs(blogs.map(blog => 
        blog.id === blogId ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
      ));
      
      const newLikedPosts = [...likedPosts, blogId];
      setLikedPosts(newLikedPosts);
      localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));

      const res = await fetch(`http://localhost:5000/api/blogs/${blogId}/like`, {
        method: 'PUT'
      });
      const data = await res.json();
      if (!data.success) {
        // Revert on failure (simple version: just refetch or rely on next refresh)
        console.error('Failed to like post');
      }
    } catch (error) {
      console.error('Failed to like post', error);
    }
  };

  const handleDeletePost = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error('Failed to delete post', error);
      alert("An error occurred while deleting the post.");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#080706",
      padding: "80px 20px",
      fontFamily: "'DM Sans', sans-serif",
      color: "#f0e8dc"
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;700&display=swap');`}</style>
      
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "42px", 
            fontWeight: 700, 
            marginBottom: "12px"
          }}>
            Community <span style={{ color: "#4ade80" }}>Voices</span>
          </h1>
          <p style={{ color: "rgba(240,232,220,0.6)", fontSize: "16px" }}>
            Share your health journey, tips, and experiences.
          </p>
        </motion.div>

        {/* Create Post Section */}
        {user ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: "40px" }}
          >
            {!showPostForm ? (
              <button 
                onClick={() => setShowPostForm(true)}
                style={{
                  width: "100%", padding: "18px", borderRadius: "16px",
                  background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(74,222,128,0.3)",
                  color: "#4ade80", fontSize: "16px", fontWeight: 500, cursor: "pointer",
                  transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(74,222,128,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              >
                <span style={{ fontSize: "20px" }}>+</span> Create a New Post
              </button>
            ) : (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                onSubmit={handleCreatePost}
                style={{
                  background: "#0d0c0b", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "16px", color: "#f0e8dc" }}>Write a Post</h3>
                <input 
                  type="text" 
                  placeholder="Post Title..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f0e8dc", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                    marginBottom: "16px", outline: "none", boxSizing: "border-box"
                  }}
                  required
                />
                <textarea 
                  placeholder="What's on your mind?" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f0e8dc", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                    marginBottom: "16px", outline: "none", boxSizing: "border-box", resize: "vertical"
                  }}
                  required
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <button 
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    style={{
                      padding: "10px 20px", borderRadius: "10px", background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,232,220,0.6)",
                      cursor: "pointer", fontSize: "14px", fontWeight: 500
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isPosting}
                    style={{
                      padding: "10px 24px", borderRadius: "10px",
                      background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
                      border: "none", color: "#021a0a", cursor: "pointer",
                      fontSize: "14px", fontWeight: 700, opacity: isPosting ? 0.7 : 1
                    }}
                  >
                    {isPosting ? "Posting..." : "Publish"}
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              padding: "20px", background: "rgba(34,197,94,0.05)", 
              border: "1px solid rgba(34,197,94,0.2)", borderRadius: "16px",
              textAlign: "center", marginBottom: "40px"
            }}
          >
            <p style={{ color: "#4ade80", fontSize: "15px", margin: 0, fontWeight: 500 }}>
              Please log in to join the conversation, create posts, and leave comments!
            </p>
          </motion.div>
        )}

        {/* Blogs List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "rgba(240,232,220,0.5)" }}>Loading posts...</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "rgba(240,232,220,0.5)" }}>No posts yet. Be the first to share!</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {blogs.map((blog, idx) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (idx * 0.05) }}
                style={{
                  background: "#0d0c0b", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "20px", padding: "30px", overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)", position: "relative"
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "linear-gradient(to bottom, #22c55e, #059669)" }} />
                
                {user && user.id === blog.user_id && (
                  <button
                    onClick={() => handleDeletePost(blog.id)}
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#ef4444",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Delete
                  </button>
                )}
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", paddingRight: user && user.id === blog.user_id ? "70px" : "0" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#f0e8dc", margin: 0 }}>
                    {blog.title}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <motion.button 
                      whileHover={likedPosts.includes(blog.id) ? {} : { scale: 1.1 }}
                      whileTap={likedPosts.includes(blog.id) ? {} : { scale: 0.9 }}
                      onClick={() => handleLike(blog.id)}
                      disabled={likedPosts.includes(blog.id)}
                      style={{ 
                        background: likedPosts.includes(blog.id) ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)", 
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "20px", padding: "6px 12px", display: "flex", alignItems: "center", gap: "6px",
                        cursor: likedPosts.includes(blog.id) ? "default" : "pointer", 
                        color: likedPosts.includes(blog.id) ? "#fca5a5" : "#ef4444", 
                        fontSize: "13px", fontWeight: 700,
                        opacity: likedPosts.includes(blog.id) ? 0.8 : 1
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>{likedPosts.includes(blog.id) ? "❤️" : "♥"}</span> {blog.likes || 0}
                    </motion.button>
                    <span style={{ fontSize: "12px", color: "rgba(240,232,220,0.4)" }}>
                      {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80", fontSize: "12px", fontWeight: 700 }}>
                    {blog.author_name ? blog.author_name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <span style={{ fontSize: "13px", color: "rgba(240,232,220,0.6)", fontWeight: 500 }}>
                    {blog.author_name || 'Anonymous'}
                  </span>
                </div>

                <p style={{ color: "rgba(240,232,220,0.8)", fontSize: "15px", lineHeight: 1.6, marginBottom: "30px", whiteSpace: "pre-wrap" }}>
                  {blog.content}
                </p>

                {/* Comments Section */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                  <h4 style={{ fontSize: "14px", color: "rgba(240,232,220,0.6)", marginBottom: "16px", fontWeight: 500 }}>
                    Comments ({blog.comments ? blog.comments.length : 0})
                  </h4>
                  
                  {blog.comments && blog.comments.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                      {blog.comments.map((comment) => (
                        <div key={comment.id} style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontSize: "13px", color: "#4ade80", fontWeight: 500 }}>{comment.author_name}</span>
                            <span style={{ fontSize: "11px", color: "rgba(240,232,220,0.3)" }}>
                              {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: "14px", color: "rgba(240,232,220,0.7)" }}>{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {user ? (
                    <form onSubmit={(e) => handleAddComment(e, blog.id)} style={{ display: "flex", gap: "12px" }}>
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        value={commentInputs[blog.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [blog.id]: e.target.value })}
                        style={{
                          flex: 1, padding: "10px 16px", borderRadius: "100px",
                          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                          color: "#f0e8dc", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                          outline: "none"
                        }}
                      />
                      <button 
                        type="submit"
                        disabled={!commentInputs[blog.id]?.trim()}
                        style={{
                          padding: "0 20px", borderRadius: "100px",
                          background: commentInputs[blog.id]?.trim() ? "linear-gradient(135deg, #22c55e 0%, #059669 100%)" : "rgba(255,255,255,0.1)",
                          border: "none", color: commentInputs[blog.id]?.trim() ? "#021a0a" : "rgba(255,255,255,0.3)", 
                          cursor: commentInputs[blog.id]?.trim() ? "pointer" : "not-allowed",
                          fontSize: "13px", fontWeight: 700, transition: "all 0.2s"
                        }}
                      >
                        Reply
                      </button>
                    </form>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;