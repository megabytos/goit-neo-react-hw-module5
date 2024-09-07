import { useEffect, useState } from 'react';
import {fetchTrendMovies} from '../../api/tmdb'
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
    const [movies, setMovies] = useState([]);  
    useEffect(() => {     
      async function fetchMovies() {
        try {          
          const response = await fetchTrendMovies();            
          setMovies(response.results);            
        } catch (error) {          
          console.log(error);
        } 
      }
      fetchMovies();
    }, []);  
    return (
      <>
        <h1>Trending today</h1>
        <MovieList movies={movies}/>
      </>
    );
}

export default HomePage