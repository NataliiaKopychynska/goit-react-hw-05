import axios from "axios";

// axios.defaults.baseURL = "https://api.themoviedb.org";

const API_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzA1MDY0ZWE5NzJhY2RiMGUzOTU5NTM1MzcxOTFhZCIsIm5iZiI6MTczMTA3MzA2Ny4xMzQsInN1YiI6IjY3MmUxNDJiYTgxODcxM2JkZjQ5NDliNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DQq5hgZ9Dcu19vU6xd6usgjx9Y-wIHlbykC3tXu2Mig";

export const options = {
  method: "GET",
  url: API_URL,
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
  params: {
    page: 1, // Можна додати інші параметри, якщо необхідно
  },
};

// axios(options)
//   .then((response) => {
//     console.log(response.data); // Обробляємо отримані дані
//   })
//   .catch((error) => {
//     console.error("Error fetching movie changes:", error);
//   });

const fetchMovies = async () => {
  const response = await axios.get(API_URL, options);
  return response.data;
};

export default fetchMovies;
