import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "42a39e95";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((response) => setMovie(response.data));
  }, [id]);

  if (!movie) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="container movie-details-container">
      <div className="card movie-details-card">
        <img src={movie.Poster} className="movie-details-poster" alt={movie.Title} />
        <div className="movie-details-content">
          <h2>{movie.Title}</h2>
          <p><strong>🎬 Genre:</strong> {movie.Genre}</p>
          <p><strong>📅 Released:</strong> {movie.Released}</p>
          <p><strong>⭐ IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>🎭 Actors:</strong> {movie.Actors}</p>
          <p><strong>🎥 Director:</strong> {movie.Director}</p>
          <p><strong>📖 Plot:</strong> {movie.Plot}</p>
          <Link to="/movies" className="btn btn-primary mt-3">⬅ Back to Search</Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
