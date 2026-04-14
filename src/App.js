import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = "6c9c8ee9";

  const searchMovies = async () => {
    if (!search) return;

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieDetails = async (id) => {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );
    const data = await res.json();
    setSelectedMovie(data);
  };

  return (
    <div className="app">
      <h1>🎬 Movie Explorer</h1>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchMovies();
          }}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {/* SEARCH RESULTS */}
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.imdbID}
              onClick={() => getMovieDetails(movie.imdbID)}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300"
                }
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>Search for movies above 👆</p>
        )}
      </div>

      {/* POPUP */}
      {selectedMovie && (
        <div className="popup" onClick={() => setSelectedMovie(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMovie.Title}</h2>
            <img
              src={
                selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : "https://via.placeholder.com/300"
              }
              alt=""
            />
            <p><b>Year:</b> {selectedMovie.Year}</p>
            <p><b>Genre:</b> {selectedMovie.Genre}</p>
            <p><b>IMDB:</b> ⭐ {selectedMovie.imdbRating}</p>
            <p>{selectedMovie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;