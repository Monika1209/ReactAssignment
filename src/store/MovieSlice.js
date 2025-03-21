import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "42a39e95"; 

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (query) => {
  const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  return response.data.Search || [];
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch movies.";
      });
  },
});

export const { addToFavorites, removeFromFavorites } = movieSlice.actions;
export default movieSlice.reducer;
