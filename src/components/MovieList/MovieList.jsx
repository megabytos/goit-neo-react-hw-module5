import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, original_title, release_date }) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state={location}>
            {original_title} {release_date ? `(${release_date.slice(0, 4)})` : ''}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
