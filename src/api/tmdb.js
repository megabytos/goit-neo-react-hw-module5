import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_API_ACCESS_KEY_TMDB;
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchData = async (endpoint, params = {}) => {
  try {    
    const { data } = await axios.get(`${endpoint}`, {
      ...options,
      params: {
        language: 'en-US',
        ...params,
      },      
    });    
    return data;
  } catch (error) {
    console.error(`Error fetching data : `, error);
    throw error;
  }
};

export const fetchTrendMovies = async (page = 1) => {
  return fetchData('trending/movie/day', { page: page });
};

export const fetchSearchMoviesByTitle = async (movieTitle, page = 1) => {
  return fetchData('search/movie', {
    query: movieTitle,
    include_adult: false,
    page,
  });
};

export const fetchMovieById = async movieId => {
  return fetchData(`movie/${movieId}`);
};

export const fetchMovieCastById = async movieId => {
  return fetchData(`movie/${movieId}/credits`);
};

export const fetchMovieReviewsById = async movieId => {
  return fetchData(`movie/${movieId}/reviews`);
};
