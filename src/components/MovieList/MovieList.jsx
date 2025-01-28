// import { NavLink } from "react-router-dom";
// import s from "./MovieList.module.css";

// const MovieList = ({ movie, searchQuery }) => {
//   return (
//     <div
//       //   key={movie.id}
//       className={s.card}
//     >
//       <NavLink to={`/movie/${movie.id}`} state={{ searchQuery }} id={movie.id}>
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className={s.img}
//         />
//         <h3 className={s.tittleMovie}>{movie.title}</h3>
//         Details
//       </NavLink>
//     </div>
//   );
// };

// export default MovieList;

import { NavLink } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <div className={s.list}>
      {movies.map((movie) => (
        <div key={movie.id} className={s.card}>
          {/* Передаємо додаткову інформацію через state в NavLink */}
          <NavLink to={`/movie/${movie.id}`} state={{ movie }}>
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
