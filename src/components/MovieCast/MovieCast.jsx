import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCastById } from '../../api/tmdb';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetchMovieCastById(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {cast.length === 0 ? (
        <p>We dont have cast for this movie.</p>
      ) : (
        <>
          <h2>Cast</h2>
          <ul className={css.castList}>
            {cast.map(actor => (
              <li key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={actor.name}
                />
                <p className={css.name}>{actor.name}</p>
                <p>as {actor.character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;
