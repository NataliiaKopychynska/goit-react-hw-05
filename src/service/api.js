import axios from "axios";

// axios.defaults.baseURL = "https://api.themoviedb.org";

const API_URL_TrendM =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

const API_URL_Prompt =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const API_URL_DETAILS = "https://api.themoviedb.org/3/movie/";

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzA1MDY0ZWE5NzJhY2RiMGUzOTU5NTM1MzcxOTFhZCIsIm5iZiI6MTczMTA3MzA2Ny4xMzQsInN1YiI6IjY3MmUxNDJiYTgxODcxM2JkZjQ5NDliNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DQq5hgZ9Dcu19vU6xd6usgjx9Y-wIHlbykC3tXu2Mig";

// const optionsSearchPrompt = {
//   method: "GET",
//   url: API_URL_Prompt,
//   headers: {
//     accept: "application/json",
//     Authorization: API_KEY,
//   },
//   params: {
//     // query: inputValue,
//     query,
//   },
// };

// axios(options)
//   .then((response) => {
//     console.log(response.data); // Обробляємо отримані дані
//   })
//   .catch((error) => {
//     console.error("Error fetching movie changes:", error);
//   });
export const optionsTrendMovies = {
  method: "GET",
  url: API_URL_TrendM,
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
};
export const fetchMovies = async () => {
  const response = await axios.get(API_URL_TrendM, optionsTrendMovies);
  return response.data;
};

export const searchMoviesForPrompt = async (query) => {
  const response = await axios.get(API_URL_Prompt, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
    params: {
      query, // Параметр пошуку, який ви передаєте
    },
  });
  return response.data;
};

export const detailsMovie = async (movieId) => {
  const response = await axios.get(`${API_URL_DETAILS}${movieId}`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const castMovieDetails = async (movieId) => {
  const response = await axios.get(`${API_URL_DETAILS}${movieId}/credits`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const reviewsMovieDetails = async (movieId) => {
  const response = await axios.get(`${API_URL_DETAILS}${movieId}/reviews`, {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
    params: {
      language: "en-US",
      page: 1,
    },
  });
  return response.data;
};
