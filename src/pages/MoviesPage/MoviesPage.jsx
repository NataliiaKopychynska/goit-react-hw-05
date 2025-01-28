// import { Field, Form, Formik } from "formik";

import { lazy, useEffect, useState } from "react";
import { fetchMovies, searchMoviesForPrompt } from "../../service/api";
// import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get("query");
    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, [location.search]);

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

    if (query.trim()) {
      navigate(`?query=${query}`);
    } else {
      navigate("/");
    }

    try {
      setLoading(true);
      const data = await searchMoviesForPrompt(query);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

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
