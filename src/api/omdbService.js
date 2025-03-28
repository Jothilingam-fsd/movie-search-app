
import axios from 'axios';

const OMDB_API_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        s: query,
        page: page,
        type: type,
        apiKey: process.env.REACT_APP_OMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        i: id,
        apiKey: process.env.REACT_APP_OMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
