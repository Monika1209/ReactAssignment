import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../store/MovieSlice"; 
import ReactPaginate from "react-paginate";

const MovieList = () => {
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 6;

  useEffect(() => {
    dispatch(fetchMovies("avengers")); 
  }, [dispatch]);

  const offset = currentPage * moviesPerPage;
  const currentMovies = movies.slice(offset, offset + moviesPerPage);
  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container">
      <h2 className="text-white text-center my-4">🎬 Trending Movies</h2>
      <div className="row">
        {currentMovies.map((movie) => (
          <div key={movie.imdbID} className="col-md-4 mb-4">
            <div className="card movie-card shadow">
              <img src={movie.Poster} className="card-img-top movie-poster" alt={movie.Title} />
              <div className="card-body text-center">
                <h5 className="card-title">{movie.Title}</h5>
                <div className="btn-group">
                  <Link to={`/movie/${movie.imdbID}`} className="btn btn-info btn-sm">Details</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default MovieList;
