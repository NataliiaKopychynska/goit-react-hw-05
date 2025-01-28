import { useEffect, useState } from "react";
import { reviewsMovieDetails } from "../../service/api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReviewsMovie = async () => {
      if (!movieId) return;
      //   if (casts === null) {
      //     return <p>Cast not found!</p>;
      //   }
      setLoading(true);
      try {
        const data = await reviewsMovieDetails(movieId);
        setReviews(data.results || []);
      } catch (error) {
        setIsError(error.message);
        // console.error("Error fatching cast", error);
      } finally {
        setLoading(false);
      }
    };
    getReviewsMovie();
  }, [movieId]);

  return (
    <div className={s.content}>
      {loading && <p>Loading...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className={s.rContain} key={review.id}>
            <h3 className={s.nameAchter}>{review.author_details.name}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>Reviews not found!</p>
      )}
    </div>
  );
};

export default MovieReviews;
