import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add new post
export const addPost = createAsyncThunk("posts/addPost", async (post) => {
    const response = await axios.post(API_URL, post);
    return { ...response.data, id: Math.floor(Math.random() * 10000) }; 
  });
  

// Edit post
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post);
  return response.data;
});

// Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload); 
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
