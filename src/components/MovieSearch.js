import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/MovieSlice";
import MovieList from "./MovieList";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.movies);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchMovies(query));
    }
  };

  return (
    <div className="container text-white text-center mt-5">
      <h1 className="mb-4 fw-bold">🎬 Movie Search App</h1>
      <div className="input-group mb-4 w-50 mx-auto">
        <input
          type="text"
          className="form-control bg-dark text-white"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <MovieList />
    </div>
  );
};

export default MovieSearch;
