import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMoviesByTitle } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title') || '';

  useEffect(() => {
    if (title === '') {
      setMovies([]);
      return;
    }
    async function fetchMovie() {
      try {
        const response = await fetchSearchMoviesByTitle(title);
        setMovies(response.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovie();
  }, [title]);

  return (
    <div className={css.container}>
      <input
        type="text"
        value={title}
        onChange={e => setSearchParams(e.target.value.trimStart() ? { title: e.target.value.trimStart() } : {})}
        className={css.search}
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      {movies.length > 0 ? <MovieList movies={movies} /> : title ? <p>No movies found</p> : ''}
    </div>
  );
};

export default MoviesPage;
