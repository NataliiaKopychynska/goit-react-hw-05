import { useEffect, useState } from "react";
import { castMovieDetails } from "../../service/api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [casts, setCasts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCastMovie = async () => {
      if (!movieId) return;
      //   if (casts === null) {
      //     return <p>Cast not found!</p>;
      //   }
      setLoading(true);
      try {
        const data = await castMovieDetails(movieId);
        setCasts(data.cast || []);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCastMovie();
  }, [movieId]);

  return (
    <div className={s.content}>
      {loading && <p>Loading...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}

      {casts.length > 0 ? (
        casts.map((cast) => (
          <div className={s.castContain} key={cast.id}>
            <img
              className={s.img}
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={cast.name}
            />
            <h3 className={s.nameAchter}>{cast.name}</h3>
          </div>
        ))
      ) : (
        <p>Cast not found!</p>
      )}
    </div>
  );
};

export default MovieCast;
