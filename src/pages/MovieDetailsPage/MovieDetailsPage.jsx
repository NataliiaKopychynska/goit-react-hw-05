import { NavLink, Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
  return (
    <>
      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
        <Outlet />
      </nav>
    </>
  );
};
export default MovieDetailsPage;
