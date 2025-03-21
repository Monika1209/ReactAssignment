import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((response) => setPost(response.data));
  }, [id]);

  if (!post) return <h2 className="text-white text-center">Loading...</h2>;

  return (
    <div className="container text-white mt-5">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/blog" className="btn btn-primary">⬅ Back</Link>
    </div>
  );
};

export default PostDetails;
