import { useEffect, useState } from "react";
import fetchMovies from "../../service/api";
import MovieList from "../../components/MovieList/MovieList";
import { Form, Formik } from "formik";

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
      <Formik>
        <Form></Form>
      </Formik>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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

export default MoviesPage;
