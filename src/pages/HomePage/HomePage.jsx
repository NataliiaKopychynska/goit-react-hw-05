import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../service/api";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.error("Error fetching movies:", error);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(movies);
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
      {isError && <p>Something went wrong. Please try again later.</p>}
    </div>
  );
};

export default HomePage;
