import { lazy, useEffect, useState } from "react";
import { searchMoviesForPrompt } from "../../service/api";
import s from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Використовуємо useSearchParams для доступу до параметрів запиту

  // Функція для отримання фільмів на основі запиту
  const fetchMoviesAndSetState = async (query) => {
    try {
      setLoading(true);
      const data = await searchMoviesForPrompt(query);
      console.log("Fetched movies:", data); // Debug
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Викликається при змінах у параметрах пошуку або коли користувач вводить новий запит
  useEffect(() => {
    const queryFromUrl = searchParams.get("query");
    if (queryFromUrl) {
      setQuery(queryFromUrl);
      fetchMoviesAndSetState(queryFromUrl); // Оновлюємо фільми при зміні параметрів
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast("Please, enter your search query!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // Оновлюємо URL з новим запитом
    navigate(`?query=${query}`);
  };

  return (
    <div className={s.contentContainer}>
      <Toaster />
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          className={s.inputForm}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Оновлення стану query при введенні
        />
        <button type="submit" className={s.submitButton}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {!loading && movies.length > 0 && (
        <div className={s.cardGrid}>
          <MovieList movies={movies} />
        </div>
      )}
      {!loading && movies.length === 0 && (
        <p className={s.noFound}>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesPage;
