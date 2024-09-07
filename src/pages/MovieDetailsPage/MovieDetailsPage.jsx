import { useEffect, useState, Suspense, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../api/tmdb';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const location = useLocation();
  const prevLocation = useRef(location.state ?? '/movies');
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetchMovieById(movieId);
        setMovie(response);
      } catch (error) {
        console.log(error);
      }
    }
    movieId && fetchMovie();
  }, [movieId]);

  return (
    <>      
      <button onClick={() => navigate(prevLocation?.current)} className={css.backBtn}>&larr; Go back</button>
      {!!movie && (
        <>
          <div className={css.wpapper}>
            {!!movie.poster_path && (
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <div className={css.details}>
              <h1>
                {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
              </h1>
              {movie?.vote_average > 0 && <p>Score: {Math.round(movie.vote_average * 10)}%</p>}
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map((item, index) => `${item.name}${index < movie.genres.length - 1 ? ', ' : ''}`)}</p>
            </div>
          </div>

          <div className={css.additional}>
            <h4>Additional information</h4>
            <ul>
              <li>
                <NavLink to="cast" state={location}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" state={location}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>          
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
