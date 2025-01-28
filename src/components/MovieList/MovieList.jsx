import { NavLink } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movie, searchQuery }) => {
  return (
    <div
      //   key={movie.id}
      className={s.card}
    >
      <NavLink to={`/movie/${movie.id}`} state={{ searchQuery }} id={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={s.img}
        />
        <h3 className={s.tittleMovie}>{movie.title}</h3>
        Details
      </NavLink>
    </div>
  );
};

export default MovieList;
