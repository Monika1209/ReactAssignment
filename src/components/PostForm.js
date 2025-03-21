import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addPost, updatePost } from "../store/PostSlice";

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editingPost = location.state?.post || { title: "", body: "" };

  const [post, setPost] = useState(editingPost);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.id) {
      dispatch(updatePost(post));
    } else {
      const newPost = { ...post, id: Math.floor(Math.random() * 10000) }; // Assign an ID
      dispatch(addPost(newPost));
    }
    navigate("/blog");
  };
  

  return (
    <div className="container text-white mt-4">
      <h2>{post.id ? "Edit Post" : "Add New Post"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control bg-dark text-white"
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control bg-dark text-white"
            placeholder="Content"
            rows="5"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default PostForm;
