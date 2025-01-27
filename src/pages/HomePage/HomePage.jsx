import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../service/api";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results); // Перевіряємо, чи є `results`
        } else {
          setMovies([]); // Якщо `data.results` не існує, встановлюємо порожній масив
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]); // У разі помилки також встановлюємо порожній масив
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* <Formik>
        <Form></Form>
      </Formik> */}
      <h2 className={s.title}>Trending today</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={s.cardGrid}>
          {movies.length > 0 ? (
            movies.map((movie) => <MovieList key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
