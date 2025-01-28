import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { detailsMovie } from "../../service/api";
import { useEffect, useState } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    const previousPage = document.referrer;
    if (previousPage) {
      navigate(-1);
    } else {
      navigate("/movies");
    }
  };
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!movieId) {
        console.error("Movie ID is undefined!");
        return;
      }
      setLoading(true);
      try {
        const data = await detailsMovie(movieId);

        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movies details:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <div className={s.detilesMovie}>
        {/* <NavLink className={s.backLink} to="/">
          Go back
        </NavLink> */}
        <button onClick={handleGoBack} className={s.backLink}>
          Go back
        </button>
        {movieDetails && (
          <div className={s.firstInfContainer}>
            <img
              className={s.poster}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div>
              <h1 className={s.nameM}>{movieDetails.title}</h1>
              <p className={s.titleM}>{movieDetails.overview}</p>
            </div>
          </div>
        )}
        {loading && <p>Loading...</p>}
        {!movieDetails && <p>No details available for this movie.</p>}
      </div>
      <nav className={s.addInformBtn}>
        <NavLink className={buildLinkClass} to="cast">
          Cast
        </NavLink>
        <NavLink className={buildLinkClass} to="reviews">
          Reviews
        </NavLink>
        <Outlet />
      </nav>
    </>
  );
};
export default MovieDetailsPage;
