import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsById } from '../../api/tmdb';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchMovieReviewsById(movieId);
        setReviews(response.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {reviews.length === 0 ? (
        <p>We dont have any reviews for this movie.</p>
      ) : (
        <>
          <h2>Reviews</h2>
          <ul className={css.reviewsList}>
            {reviews.map(review => (
              <li key={review.id}>
                <p className={css.author}>Author: <b>{review.author}</b></p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
