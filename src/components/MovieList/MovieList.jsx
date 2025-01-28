import { NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={s.list}>
      {movies.map((movie) => (
        <div key={movie.id} className={s.card}>
          <NavLink to={`/movie/${movie.id}`} state={{ from: location }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={s.img}
            />
            <h3 className={s.tittleMovie}>{movie.title}</h3>
            Details
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
