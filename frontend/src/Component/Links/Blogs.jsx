import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { useLanguage } from '../../Context/LanguageContext';

const Blogs = () => {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Post State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  
  // Editing State
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');

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
      const res = await fetch('https://nutrismart-backend-cm7b.onrender.com/api/blogs');
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
      const res = await fetch('https://nutrismart-backend-cm7b.onrender.com/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, video_url: videoUrl })
      });
      const data = await res.json();
      if (data.success) {
        setBlogs([data.blog, ...blogs]);
        setTitle('');
        setContent('');
        setVideoUrl('');
        setShowPostForm(false);
      }
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleUpdatePost = async (e, blogId) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;

    try {
      const res = await fetch(`https://nutrismart-backend-cm7b.onrender.com/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: editTitle, content: editContent, video_url: editVideoUrl })
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.map(blog => {
          if (blog.id === blogId) {
            return {
              ...blog,
              title: data.blog.title,
              content: data.blog.content,
              video_url: data.blog.video_url
            };
          }
          return blog;
        }));
        setEditingPostId(null);
      } else {
        alert(data.message || "Failed to update post");
      }
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  const handleAddComment = async (e, blogId) => {
    e.preventDefault();
    const commentContent = commentInputs[blogId];
    if (!commentContent || !commentContent.trim()) return;

    try {
      const res = await fetch(`https://nutrismart-backend-cm7b.onrender.com/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentContent })
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.map(blog => {
          if (blog.id === blogId) {
            return { ...blog, comments: [...(blog.comments || []), data.comment] };
          }
          return blog;
        }));
        setCommentInputs({ ...commentInputs, [blogId]: '' });
      }
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  const handleLike = async (blogId) => {
    if (likedPosts.includes(blogId)) return;

    try {
      setBlogs(blogs.map(blog => 
        blog.id === blogId ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
      ));
      
      const newLikedPosts = [...likedPosts, blogId];
      setLikedPosts(newLikedPosts);
      localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));

      const res = await fetch(`https://nutrismart-backend-cm7b.onrender.com/api/blogs/${blogId}/like`, {
        method: 'PUT'
      });
      const data = await res.json();
      if (!data.success) {
        console.error('Failed to like post');
      }
    } catch (error) {
      console.error('Failed to like post', error);
    }
  };

  const handleDeletePost = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`https://nutrismart-backend-cm7b.onrender.com/api/blogs/${blogId}`, {
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

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    const vimeoReg = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoReg);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return null;
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--bg-primary)",
      padding: "80px 20px",
      fontFamily: "'DM Sans', sans-serif",
      color: "var(--text-primary)",
      transition: "background-color 0.3s, color 0.3s"
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;700&display=swap');`}</style>
      
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h1 style={{ 
            fontFamily: "'Inter', serif", 
            fontSize: "42px", 
            fontWeight: 700, 
            marginBottom: "12px"
          }}>
            {t("blogTitle1")} <span style={{ color: "var(--accent-text)" }}>{t("blogTitle2")}</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
            {t("blogDesc")}
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
                  background: "var(--bg-secondary)", border: "1px dashed var(--accent-border)",
                  color: "var(--accent-text)", fontSize: "16px", fontWeight: 500, cursor: "pointer",
                  transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <span style={{ fontSize: "20px" }}>+</span> {t("createPost")}
              </button>
            ) : (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                onSubmit={handleCreatePost}
                style={{
                  background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                  borderRadius: "20px", padding: "24px", 
                }}
              >
                <h3 style={{ fontFamily: "'Inter', serif", fontSize: "20px", marginBottom: "16px", color: "var(--text-primary)" }}>{t("createPost")}</h3>
                <input 
                  type="text" 
                  placeholder={t("postTitle")} 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "12px",
                    background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                    color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                    marginBottom: "16px", outline: "none", boxSizing: "border-box"
                  }}
                  required
                />
                <textarea 
                  placeholder={t("postContent")} 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "12px",
                    background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                    color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                    marginBottom: "16px", outline: "none", boxSizing: "border-box", resize: "vertical"
                  }}
                  required
                />
                <input 
                  type="text" 
                  placeholder={t("videoUrlLabel")} 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "12px",
                    background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                    color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                    marginBottom: "16px", outline: "none", boxSizing: "border-box"
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <button 
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    style={{
                      padding: "10px 20px", borderRadius: "10px", background: "transparent",
                      border: "1px solid var(--border-color)", color: "var(--text-secondary)",
                      cursor: "pointer", fontSize: "14px", fontWeight: 500
                    }}
                  >
                    {t("cancel")}
                  </button>
                  <button 
                    type="submit"
                    disabled={isPosting}
                    style={{
                      padding: "10px 24px", borderRadius: "10px",
                      background: "var(--accent-color)",
                      border: "none", color: "#ffffff", cursor: "pointer",
                      fontSize: "14px", fontWeight: 700, opacity: isPosting ? 0.7 : 1
                    }}
                  >
                    {isPosting ? t("posting") : t("publish")}
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
              padding: "20px", background: "var(--accent-light)", 
              border: "1px solid var(--accent-border)", borderRadius: "16px",
              textAlign: "center", marginBottom: "40px"
            }}
          >
            <p style={{ color: "var(--accent-text)", fontSize: "15px", margin: 0, fontWeight: 500 }}>
              {t("loginToPost")}
            </p>
          </motion.div>
        )}

        {/* Blogs List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)", }}>{t("loading")}</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)", }}>No posts yet. Be the first to share!</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {blogs.map((blog, idx) => {
              const embedUrl = getYouTubeEmbedUrl(blog.video_url);
              const isEditing = editingPostId === blog.id;

              return (
                <motion.div 
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                  style={{
                    background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                    borderRadius: "20px", padding: "30px", overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "var(--accent-color)" }} />
                  
                  {user && user.id === blog.user_id && !isEditing && (
                    <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          setEditingPostId(blog.id);
                          setEditTitle(blog.title);
                          setEditContent(blog.content);
                          setEditVideoUrl(blog.video_url || '');
                        }}
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-primary)",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(blog.id)}
                        style={{
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
                      >
                        {t("delete")}
                      </button>
                    </div>
                  )}

                  {isEditing ? (
                    <form onSubmit={(e) => handleUpdatePost(e, blog.id)} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>Edit Blog Post</h3>
                      <input 
                        type="text" 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                        style={{
                          width: "100%", padding: "10px 14px", borderRadius: "10px",
                          background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                          color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box"
                        }}
                      />
                      <textarea 
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        required
                        rows={4}
                        style={{
                          width: "100%", padding: "10px 14px", borderRadius: "10px",
                          background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                          color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box", resize: "vertical"
                        }}
                      />
                      <input 
                        type="text" 
                        placeholder={t("videoUrlLabel")} 
                        value={editVideoUrl}
                        onChange={(e) => setEditVideoUrl(e.target.value)}
                        style={{
                          width: "100%", padding: "10px 14px", borderRadius: "10px",
                          background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                          color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box"
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <button 
                          type="button"
                          onClick={() => setEditingPostId(null)}
                          style={{
                            padding: "8px 16px", borderRadius: "8px", background: "transparent",
                            border: "1px solid var(--border-color)", color: "var(--text-secondary)", cursor: "pointer", fontSize: "13px"
                          }}
                        >
                          {t("cancel")}
                        </button>
                        <button 
                          type="submit"
                          style={{
                            padding: "8px 20px", borderRadius: "8px", border: "none",
                            background: "var(--accent-color)", color: "#ffffff", cursor: "pointer", fontSize: "13px", fontWeight: "bold"
                          }}
                        >
                          {t("save")}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", paddingRight: user && user.id === blog.user_id ? "140px" : "0" }}>
                        <h2 style={{ fontFamily: "'Inter', serif", fontSize: "24px", color: "var(--text-primary)", margin: 0 }}>
                          {blog.title}
                        </h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <motion.button 
                            whileHover={likedPosts.includes(blog.id) ? {} : { scale: 1.1 }}
                            whileTap={likedPosts.includes(blog.id) ? {} : { scale: 0.9 }}
                            onClick={() => handleLike(blog.id)}
                            disabled={likedPosts.includes(blog.id)}
                            style={{ 
                              background: likedPosts.includes(blog.id) ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.05)", 
                              border: "1px solid rgba(239, 68, 68, 0.2)",
                              borderRadius: "20px", padding: "6px 12px", display: "flex", alignItems: "center", gap: "6px",
                              cursor: likedPosts.includes(blog.id) ? "default" : "pointer", 
                              color: "#ef4444", 
                              fontSize: "13px", fontWeight: 700
                            }}
                          >
                            <span style={{ fontSize: "16px" }}>{likedPosts.includes(blog.id) ? "❤️" : "♥"}</span> {blog.likes || 0}
                          </motion.button>
                          <span style={{ fontSize: "12px", color: "var(--text-secondary)", }}>
                            {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-text)", fontSize: "12px", fontWeight: 700 }}>
                          {blog.author_name ? blog.author_name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
                          {blog.author_name || 'Anonymous'}
                        </span>
                      </div>

                      <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, marginBottom: "20px", whiteSpace: "pre-wrap" }}>
                        {blog.content}
                      </p>

                      {/* Video Render */}
                      {blog.video_url && (
                        <div style={{ marginBottom: "24px" }}>
                          {embedUrl ? (
                            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                              <iframe
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                                src={embedUrl}
                                title="Recipe Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div style={{ border: "1px solid var(--border-color)", borderRadius: "12px", padding: "12px", background: "var(--bg-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                              <span style={{ fontSize: "20px" }}>🎥</span>
                              <div>
                                <span style={{ fontSize: "14px", fontWeight: 600 }}>Recipe Video Link: </span>
                                <a href={blog.video_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "var(--accent-text)", textDecoration: "underline" }}>
                                  {blog.video_url}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Comments Section */}
                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
                    <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", fontWeight: 500 }}>
                      {t("comments")} ({blog.comments ? blog.comments.length : 0})
                    </h4>
                    
                    {blog.comments && blog.comments.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                        {blog.comments.map((comment) => (
                          <div key={comment.id} style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)", padding: "12px 16px", borderRadius: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                              <span style={{ fontSize: "13px", color: "var(--accent-text)", fontWeight: 500 }}>{comment.author_name}</span>
                              <span style={{ fontSize: "11px", color: "var(--text-secondary)", }}>
                                {new Date(comment.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-primary)", }}>{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {user ? (
                      <form onSubmit={(e) => handleAddComment(e, blog.id)} style={{ display: "flex", gap: "12px" }}>
                        <input 
                          type="text" 
                          placeholder={t("addCommentPlaceholder")} 
                          value={commentInputs[blog.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [blog.id]: e.target.value })}
                          style={{
                            flex: 1, padding: "10px 16px", borderRadius: "100px",
                            background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                            color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                            outline: "none"
                          }}
                        />
                        <button 
                          type="submit"
                          disabled={!commentInputs[blog.id]?.trim()}
                          style={{
                            padding: "0 20px", borderRadius: "100px",
                            background: commentInputs[blog.id]?.trim() ? "var(--accent-color)" : "var(--border-color)",
                            border: "none", color: commentInputs[blog.id]?.trim() ? "#ffffff" : "var(--text-secondary)", 
                            cursor: commentInputs[blog.id]?.trim() ? "pointer" : "not-allowed",
                            fontSize: "13px", fontWeight: 700, transition: "all 0.2s"
                          }}
                        >
                          {t("reply")}
                        </button>
                      </form>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;