// import { useEffect, useState } from "react";
// import fetchMovies from "../../service/api";
// import MovieList from "../../components/MovieList/MovieList";
// import { Form, Formik } from "formik";

import { useState } from "react";
import { searchMoviesForPrompt } from "../../service/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";

// function MoviesPage() {
//   const [moviesList, setMoviesList] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchMovies();
//         setMoviesList(data.results); // Якщо потрібен список фільмів
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };
//     getData();
//   }, []);
//   return (
//     <>
//       {/* {JSON.stringify(moviesList, null, 2)} */}
//       {moviesList.map((movie) => (
//         <div key={movie.id}>
//           <h2>{movie.title}</h2>
//           <p>{movie.overview}</p>
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title} />
//           <NavLink to="movieId">Details</NavLink>
//         </div>
//       ))}
//     </>
//   );
// }
// export default MoviesPage;

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast("Please, enter your prompt!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    //через inputValue робимо feth запит на пошук фільму
    try {
      const data = await searchMoviesForPrompt(query);
      setLoading(true);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.contentContainer}>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          className={s.inputForm}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
        />
      </form>
      {loading && <p>Loading...</p>}
      <div className={s.cardGrid}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieList key={movie.id} movie={movie} />)
        ) : (
          <p className={s.noFound}>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
