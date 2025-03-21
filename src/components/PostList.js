import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, fetchPosts } from "../store/PostSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <h2 className="text-center text-white">Loading...</h2>;

  return (
    <div className="container">
      <h2 className="text-white text-center my-4">📝 Blog Posts</h2>
      <Link to="/blog/add" className="btn btn-success mb-3">+ Add Post</Link>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card bg-dark text-white shadow">
              <div className="card-body">
                <h5>{post.title}</h5>
                <p>{post.body.substring(0, 60)}...</p>
                <Link to={`/blog/post/${post.id}`} className="btn btn-info btn-sm">View</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => dispatch(deletePost(post.id))}>🗑 Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
