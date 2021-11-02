import axios from 'axios';
const API_KEY = '7fa19289450d103be1f54a0c993182c2';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
//trending movies
const fetchTrending = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
    return results;
  } catch (error) {
    console.log(error.message);
  }
};
//поиск кинофильма по ключевому слову на странице фильмов

const fetchSearchMovies = async query => {
  try {
    const {
      data: { results },
    } = await axios.get(
      `search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`,
    );

    // console.log(results);
    return results;
  } catch (error) {
    console.log(error.message);
  }
};
//запрос полной информации о фильме для страницы кинофильма.
const fetchMovieById = async movieId => {
  try {
    const response = await axios.get(
      `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    );
    // console.log(data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

//запрос информации о актёрском составе для страницы кинофильма.

const fetchMovieByCast = async movieId => {
  try {
    const results = await axios.get(
      `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    );

    return results.data.cast;
  } catch (error) {
    console.log(error.message);
  }
};

//запрос обзоров для страницы кинофильма

const fetchMovieReviews = async movieId => {
  try {
    const { data } = await axios.get(
      `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
    );
    // console.log(data);
    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const Api = {
  fetchTrending,
  fetchSearchMovies,
  fetchMovieById,
  fetchMovieByCast,
  fetchMovieReviews,
};
export const posterUrl = 'https://image.tmdb.org/t/p/w500';
export const castUrl = 'https://image.tmdb.org/t/p/w92';
export default Api;
